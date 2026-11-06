import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import { GetEventReviewsResponse } from "@/types/review";

interface GetEventsParams {
  page?: number;
  take?: number;
  search?: string;
  category?: string;
}

const getApiEndpoint = (resource: string) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL_API is not configured");
  }

  return `${apiBaseUrl.replace(/\/+$/, "")}/${resource}`;
};

export async function getEventsFromServer({
  page = 1,
  take = 10,
  search,
  category,
}: GetEventsParams): Promise<PageableResponse<Event>> {
  const query = new URLSearchParams({ page: String(page), take: String(take) });

  if (search) query.set("search", search);
  if (category) query.set("category", category);

  const response = await fetch(`${getApiEndpoint("events")}?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events (${response.status})`);
  }

  return response.json() as Promise<PageableResponse<Event>>;
}

export async function getEventFromServer(id: number): Promise<Event | null> {
  const response = await fetch(`${getApiEndpoint("events")}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 400 || response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch event (${response.status})`);
  }

  return response.json() as Promise<Event>;
}

export async function getEventReviewsFromServer(
  id: number,
): Promise<GetEventReviewsResponse | null> {
  const response = await fetch(`${getApiEndpoint("reviews")}/event/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json() as Promise<GetEventReviewsResponse>;
}
