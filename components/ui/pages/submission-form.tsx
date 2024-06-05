"use client";

import React, { useState } from "react";
import { Form } from "../form";
import { Button } from "../button";
import { generateForm } from "@/lib/form";
import { z } from "zod";
import { Input } from "../input";
import { useToast } from "@/components/ui/use-toast";
import { sendDiscordMessage } from "@/app/_actions/discord";
import Editor from "../editor";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
const stripHtmlTags = (str: string) => {
  if (typeof str === "string") {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return str;
};

const SubmissionForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { form, schema } = generateForm({
    schema: z.object({
      name: z.string().min(1),
      editor: z.string().min(20),
    }),
  });

  const { toast } = useToast();

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {
    setLoading(true);
    toast({
      title: "Success!",
      description: `Welcome to the demo ${data.name}!`,
    });
    console.log(data);

    const cleanedData = {
      ...data,
      editor: stripHtmlTags(data.editor),
    };
    await sendDiscordMessage(cleanedData);
	setOpen(false)
    setLoading(false);
	
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Send Message</DialogTrigger>
        <DialogContent className="w-full max-w-md mx-4 my-6 p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Message Zaid</DialogTitle>
            <DialogDescription>
              Fill out the form with your Request
            </DialogDescription>
          </DialogHeader>

          <Form
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-4 overflow-auto"
          >
            <Input
              label="Name"
              type="name"
              field="name"
              control={form.control}
            />
            <Editor
              label="Request Details"
              field="editor"
              control={form.control}
            />

            <div className="flex space-x-2">
              <Button loading={loading} type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionForm;
