import { NextResponse } from 'next/server';

const API_ENDPOINT = process.env.PRIVATE_API_ENDPOINT; // No NEXT_PUBLIC_ prefix

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINT!, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

