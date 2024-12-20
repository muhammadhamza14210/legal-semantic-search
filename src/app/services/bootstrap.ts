"use server";

import { NextResponse } from "next/server";
import { createIndexIfNecessary, indexHasVectors } from "./pinecone";

export const initiateBootstrapping = async (targetIndex: string) => {
  const baseUrl = process.env.PRODUCION_URL
    ? `https://${process.env.PRODUCION_URL}`
    : `https://${process.env.PORT}`;

  const response = await fetch(`${baseUrl}/api/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ targetIndex })
  });

  if (!response.ok) {
    throw new Error(`Failed to initiate bootstrapping: ${response.status}`);
  }
};

export const handleBootStrapping = async (targetIndex: string) => {
  try {
    console.log(`Handling bootstrapping for index: ${targetIndex}`);
    await createIndexIfNecessary(targetIndex);
    const hasVectors = await indexHasVectors(targetIndex);
    if (hasVectors) {
      console.log("Index exists and already has vectors.");
      return NextResponse.json({success: true}, {status: 200});
    }
  } catch (error) {}
};
