import express from "express";
import Merchant from "../models/merchant.model" // Adjust the path to your Merchant model

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      merchant?: string | null; // Adjust the type as needed
    }
  }
}