'use client';

import * as React from 'react';
import * as z from 'zod';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import StatusCheckbox from '@/components/shared/status-checkbox';

import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { SubtaskResponse, TaskResponse } from '@/types';
import { SubtaskService } from '@/services/subtask-service';
import { handleError } from '@/lib/util';

interface SubtaskFormProps {
  subtask?: SubtaskResponse;
  task: TaskResponse;
  close: () => void;
  closeNewSubtask?: () => void;
}

export const subtaskFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
});

export type SubtaskFormValues = z.infer<typeof subtaskFormSchema>;

function SubtaskForm({
  subtask,
  task,
  close,
  closeNewSubtask,
}: SubtaskFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const defaultValues: Partial<SubtaskFormValues> = {
    name: subtask?.name,
  };

  const path = usePathname();
  const form = useForm<SubtaskFormValues>({
    resolver: zodResolver(subtaskFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubtaskFormValues) => {
    setIsLoading(true);
    try {
      if (subtask) {
        await SubtaskService.updateSubtask(subtask.id, {
          ...subtask,
          name: data.name,
        });
        toast.success('Subtask updated!');
      } else {
        await SubtaskService.createSubtask(task.id, data);
        toast.success('Subtask created!');
      }
      revalidatePath(path, 'page');
      close && close();
      closeNewSubtask && closeNewSubtask();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(true);
    }
  };

  const onClose = () => {
    close && close();
    closeNewSubtask && closeNewSubtask();
  };

  const watchName = form.watch('name');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex-gap">
          <StatusCheckbox disabled className="border-primary bg-primary/10" />
          <Input
            transparent
            autoFocus
            {...form.register('name')}
            placeholder="Subtask Name"
            className="w-full px-0 py-0 text-xs font-semibold"
          />
        </div>
        <div className="flex-gap justify-end">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            <Icons.Close className="w-4 h-4" />
          </Button>
          <Button type="submit" size="sm" disabled={!watchName || isLoading}>
            <Icons.Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubtaskForm;