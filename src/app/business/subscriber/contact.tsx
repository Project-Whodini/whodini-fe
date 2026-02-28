'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface SubscriberContactTarget {
  id: string;
  name: string;
  email: string;
  digitalId: string;
}

interface ContactSubscriberFormProps {
  subscriber: SubscriberContactTarget;
  onCancel: () => void;
  onSend: (payload: { to: string; subject: string; message: string }) => void;
}

export function ContactSubscriberForm({
  subscriber,
  onCancel,
  onSend,
}: ContactSubscriberFormProps) {
  const [subject, setSubject] = useState(`Hello ${subscriber.name}`);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();
    if (!cleanSubject || !cleanMessage) return;

    onSend({
      to: subscriber.email,
      subject: cleanSubject,
      message: cleanMessage,
    });
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#ff5f6d]" />
          Contact Subscriber
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Send an email to {subscriber.name} ({subscriber.digitalId})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subscriber-contact-to">To</Label>
          <Input
            id="subscriber-contact-to"
            value={subscriber.email}
            readOnly
            className="bg-neutral-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscriber-contact-subject">Subject</Label>
          <Input
            id="subscriber-contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscriber-contact-message">Message</Label>
          <textarea
            id="subscriber-contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Write your message"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!subject.trim() || !message.trim()}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-xl"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
