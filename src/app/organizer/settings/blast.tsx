'use client';

import { useState, useMemo } from 'react';
import { Users, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { INITIAL_EVENTS } from '../events/page';
import { generateSeedRegistrations, type Registration } from '../events/manage';

export default function NotificationsSettings() {
  // ── Blast Mail ──────────────────────────────────────────
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [recipientFilter, setRecipientFilter] = useState<'registered' | 'all'>(
    'registered'
  );
  const [blastSubject, setBlastSubject] = useState('');
  const [blastBody, setBlastBody] = useState('');
  const [showRecipients, setShowRecipients] = useState(false);
  const [blastSent, setBlastSent] = useState(false);

  const selectedEvent = useMemo(
    () => INITIAL_EVENTS.find((e) => e.id === selectedEventId) ?? null,
    [selectedEventId]
  );

  const allRegistrations = useMemo<Registration[]>(
    () => (selectedEvent ? generateSeedRegistrations(selectedEvent) : []),
    [selectedEvent]
  );

  const recipients = useMemo(
    () =>
      recipientFilter === 'registered'
        ? allRegistrations.filter((r) => r.status === 'registered')
        : allRegistrations,
    [allRegistrations, recipientFilter]
  );

  const handleSendBlast = () => {
    if (!selectedEvent || !blastSubject.trim() || !blastBody.trim()) return;
    alert(
      `Blast email sent to ${recipients.length} attendee${recipients.length !== 1 ? 's' : ''} of "${selectedEvent.title}"!`
    );
    setBlastSent(true);
    setTimeout(() => setBlastSent(false), 3000);
  };

  const canSend =
    !!selectedEvent &&
    blastSubject.trim().length > 0 &&
    blastBody.trim().length > 0 &&
    recipients.length > 0;

  return (
    <>
      {/* ── Blast Mail ───────────────────────────────────── */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#ff5f6d]" />
            Blast Email
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Send a mass email to all attendees registered for a specific event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-700">
              Select Event *
            </Label>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setShowRecipients(false);
              }}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
            >
              <option value="">— Choose an event —</option>
              {INITIAL_EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              {/* Recipient filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-700">
                  Recipients
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { val: 'registered', label: 'Registered only' },
                      { val: 'all', label: 'All (incl. cancelled)' },
                    ] as const
                  ).map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRecipientFilter(val)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        recipientFilter === val
                          ? 'bg-[#ff5f6d] text-white border-[#ff5f6d]'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#ff5f6d] hover:text-[#ff5f6d]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Recipient count + preview toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-700">
                      <span className="font-semibold text-neutral-900">
                        {recipients.length}
                      </span>{' '}
                      recipient{recipients.length !== 1 ? 's' : ''}
                    </span>
                    {recipients.length === 0 && (
                      <Badge className="bg-amber-100 text-amber-800 text-xs">
                        No recipients
                      </Badge>
                    )}
                  </div>
                  {recipients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowRecipients((v) => !v)}
                      className="flex items-center gap-1 text-xs text-[#ff5f6d] hover:underline"
                    >
                      {showRecipients ? (
                        <>
                          Hide <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          Preview <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Recipient list preview */}
                {showRecipients && recipients.length > 0 && (
                  <div className="rounded-lg border border-neutral-200 divide-y divide-neutral-100 max-h-48 overflow-y-auto">
                    {recipients.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between px-4 py-2.5"
                      >
                        <div>
                          <div className="font-medium text-sm text-neutral-900">
                            {r.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {r.email}
                          </div>
                        </div>
                        <Badge
                          className={
                            r.status === 'registered'
                              ? 'bg-green-100 text-green-800 text-xs'
                              : 'bg-neutral-100 text-neutral-600 text-xs'
                          }
                        >
                          {r.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label
                  htmlFor="blast-subject"
                  className="text-sm font-medium text-neutral-700"
                >
                  Subject *
                </Label>
                <Input
                  id="blast-subject"
                  value={blastSubject}
                  onChange={(e) => setBlastSubject(e.target.value)}
                  placeholder={`Update about ${selectedEvent.title}`}
                  className="rounded-lg border-neutral-300"
                />
              </div>

              {/* Body */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="blast-body"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Message *
                  </Label>
                  <span className="text-xs text-neutral-400">
                    {blastBody.length} chars
                  </span>
                </div>
                <textarea
                  id="blast-body"
                  value={blastBody}
                  onChange={(e) => setBlastBody(e.target.value)}
                  rows={6}
                  placeholder={`Hi [Name],\n\nWe have an important update regarding ${selectedEvent.title}...\n\nBest regards,\nDemo Organizer`}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent resize-none"
                />
              </div>

              {/* Send */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                  This will send to{' '}
                  <span className="font-medium text-neutral-700">
                    {recipients.length} recipient
                    {recipients.length !== 1 ? 's' : ''}
                  </span>{' '}
                  via email
                </p>
                <Button
                  onClick={handleSendBlast}
                  disabled={!canSend}
                  className={`rounded-lg ${
                    blastSent
                      ? 'bg-green-600 hover:bg-green-600 text-white'
                      : 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white'
                  }`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {blastSent ? 'Sent!' : 'Send Blast Email'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
