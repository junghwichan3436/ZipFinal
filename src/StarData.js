import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const url = "https://www.googleapis.com/youtube/v3/";
const inmybag = "PL_T0ZWGcXPuNqXJvUFzCbIGqL_ohQJ-YV";
const interview = "PL_T0ZWGcXPuNQXkWWz7hHDaKDcGykNPqJ";
const working = "PL_T0ZWGcXPuNocJRthQ6lKcU3vd3H_lAb";

export function StarData() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/API/index.json").then((response) => response.json()),
  });
}

export function bagData() {
  return useQuery({
    queryKey: ["bagData"],
    queryFn: () =>
      fetch(
        `${url}playlistItems?part=snippet&playlistId=${inmybag}&maxResults=50&key=${apiKey}`
      ).then((response) => response.json()),
  });
}

export function interviewData() {
  return useQuery({
    queryKey: ["interviewData"],
    queryFn: () =>
      fetch(
        `${url}playlistItems?part=snippet&playlistId=${interview}&maxResults=50&key=${apiKey}`
      ).then((response) => response.json()),
  });
}
