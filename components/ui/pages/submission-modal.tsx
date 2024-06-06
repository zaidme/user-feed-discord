"use client";

import React, { useState } from "react";
import SubmissionForm from "./submission-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Button } from "../button";
import { MessagesSquare } from 'lucide-react';

const SubmissionModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-auto max-h-100">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><Button><MessagesSquare className="mr-2 h-4 w-4"/>Send Message</Button></DialogTrigger>
        <DialogContent className="w-full max-w-xs md:max-w-md mx-auto my-6 p-6 bg-white rounded-lg shadow-lg md:mx-auto sm:mx-4 overflow-hidden">
          <DialogHeader>
            <DialogTitle>Message Zaid</DialogTitle>
            <DialogDescription>
              Fill out the form with your Request
            </DialogDescription>
          </DialogHeader>
          
          <SubmissionForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionModal;
