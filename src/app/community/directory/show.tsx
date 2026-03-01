'use client';

import {
  ArrowLeft,
  ExternalLink,
  Pencil,
  Trash2,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DirectoryEntry } from './page';

type Props = {
  entry: DirectoryEntry;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Guidelines':
      return 'bg-red-100 text-red-800';
    case 'Resources':
      return 'bg-blue-100 text-blue-800';
    case 'Directory':
      return 'bg-purple-100 text-purple-800';
    case 'Tools':
      return 'bg-green-100 text-green-800';
    case 'Events':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-neutral-100 text-neutral-800';
  }
};

export default function ShowDirectoryEntry({
  entry,
  onEdit,
  onDelete,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-neutral-600 hover:text-neutral-900 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Button>

        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#ff5f6d]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#ff5f6d]" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                    {entry.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge
                      className={getCategoryColor(entry.category) + ' text-xs'}
                    >
                      {entry.category}
                    </Badge>
                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-xs text-neutral-600">
                      {entry.resourceType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        entry.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  onClick={onEdit}
                  size="sm"
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
                >
                  <Pencil className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  onClick={onDelete}
                  size="sm"
                  variant="outline"
                  className="border border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 space-y-6">
            {entry.description && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                  Description
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                Resource Link
              </p>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ff5f6d] hover:text-[#ff5f6d]/80 text-sm font-medium break-all"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                {entry.url}
              </a>
            </div>

            {entry.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-neutral-100 text-neutral-700 text-xs rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-100">
              <p className="text-xs text-neutral-400">
                Community: {entry.communityLabel}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
