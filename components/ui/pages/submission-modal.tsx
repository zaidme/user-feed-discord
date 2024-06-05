"use client";

import React, { useState } from "react";
import SubmissionForm from "./submission-form";
import { Button } from "../button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";

const SubmissionModal = () => {
 
  return (
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      <SubmissionForm/>
    </div>
  );
};

export default SubmissionModal;
