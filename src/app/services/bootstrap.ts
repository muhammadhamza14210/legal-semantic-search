'use server'

export const initiateBootstrapping = async (targetIndex: string) => {
  const baseUrl = process.env.PRODUCION_URL
    ? `https://${process.env.PRODUCION_URL}`
    : `https://${process.env.PORT}`;

  const response = await fetch(`${baseUrl}/api/ingest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ targetIndex }),
  });

  if (!response.ok) {
    throw new Error(`Failed to initiate bootstrapping: ${response.status}`);
  }
};
