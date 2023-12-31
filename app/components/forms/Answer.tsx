'use client';
import { AnswerSchema } from '@/lib/validations';
import React, { useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
interface Props {
  question: string;
  questionId: string;
  authorId: string;
}
const Answer = ({ question, questionId, authorId }: Props) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) {
      return toast({
        title: 'Please log in',
        description: 'You must be logged in to perform this action',
      });
    }

    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: 'POST',
          body: JSON.stringify({ question }),
        }
      );

      const aiAnswer = await response.json();

      // Convert plain text to HTML format
      console.log('jdghj', aiAnswer);
      const formattedAnswer = aiAnswer.reply;

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <div className="">
      <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAIAnswer}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            // control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <>
                    {mode === 'dark' && (
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_KEY}
                        onInit={(evt, editor) => {
                          // @ts-ignore
                          editorRef.current = editor;
                        }}
                        onBlur={field.onBlur}
                        onEditorChange={(content) => field.onChange(content)}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'preview',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'codesample',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                          ],
                          toolbar:
                            'undo redo  | ' +
                            'codesample | bold italic forecolor | alignleft aligncenter | ' +
                            'alignright alignjustify | bullist numlist outdent indent | ',
                          content_style:
                            'body { font-family:Inter ; font-size:16px }',
                          skin: 'oxide-dark',
                          content_css: 'dark',
                        }}
                      />
                    )}
                    {mode === 'light' && (
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_KEY}
                        onInit={(evt, editor) => {
                          // @ts-ignore
                          editorRef.current = editor;
                        }}
                        onBlur={field.onBlur}
                        onEditorChange={(content) => field.onChange(content)}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'preview',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'codesample',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                          ],
                          toolbar:
                            'undo redo  | ' +
                            'codesample | bold italic forecolor | alignleft aligncenter | ' +
                            'alignright alignjustify | bullist numlist outdent indent | ',
                          content_style:
                            'body { font-family:Inter ; font-size:16px }',
                          skin: 'oxide',
                          content_css: 'light',
                        }}
                      />
                    )}
                  </>
                </FormControl>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="primary-gradient w-fit text-white"
                  >
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Answer;
