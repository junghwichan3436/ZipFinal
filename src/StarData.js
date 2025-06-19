import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const inmybag = "PL_T0ZWGcXPuNqXJvUFzCbIGqL_ohQJ-YV";
const interview = "PL_T0ZWGcXPuNQXkWWz7hHDaKDcGykNPqJ";
const working = "PL_T0ZWGcXPuNocJRthQ6lKcU3vd3H_lAb";

export const playlistIds = [
  "PL_T0ZWGcXPuNqXJvUFzCbIGqL_ohQJ-YV",
  "PL_T0ZWGcXPuNQXkWWz7hHDaKDcGykNPqJ",
  "PL_T0ZWGcXPuNocJRthQ6lKcU3vd3H_lAb",
];
async function fetchAllPlaylistItems(playlistId) {
  let items = [];
  let nextPageToken = "";
  const baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems";

  do {
    const res = await fetch(
      `${baseUrl}?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
    );
    if (!res.ok)
      throw new Error(`Failed to fetch playlistItems: ${res.status}`);
    const data = await res.json();
    items = items.concat(data.items);
    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  return items;
}

async function fetchFromAllPlaylists(playlistIds) {
  const allData = await Promise.all(
    playlistIds.map((id) => fetchAllPlaylistItems(id))
  );
  // 결과는 2차원 배열이므로 1차원으로 평탄화
  return allData.flat();
}

async function fetchFromAllPlaylistsWithViews(playlistIds) {
  // 1. 여러 플레이리스트 영상 목록 가져오기
  const allItemsNested = await Promise.all(
    playlistIds.map((id) => fetchAllPlaylistItems(id))
  );
  const allItems = allItemsNested.flat();

  // 2. 영상 ID만 추출
  const videoIds = allItems.map((item) => item.contentDetails.videoId);

  // 3. videos API 호출해서 상세정보 받기 (조회수, 좋아요수, 업로드 날짜)
  let videoDetails = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${chunk.join(
        ","
      )}&key=${apiKey}`
    );
    const data = await res.json();
    videoDetails.push(...(data.items || []));
  }

  // 4. videoId -> 상세 정보 맵 만들기
  const detailsMap = {};
  videoDetails.forEach((video) => {
    detailsMap[video.id] = {
      viewCount: Number(video.statistics.viewCount || 0),
      likeCount: Number(video.statistics.likeCount || 0),
      publishedAt: video.snippet.publishedAt || null, // 영상 업로드 날짜
    };
  });

  // 5. 각 영상에 필요한 정보 추가
  const merged = allItems.map((item) => {
    const videoId = item.contentDetails.videoId;
    const details = detailsMap[videoId] || {};
    return {
      ...item.snippet,
      viewCount: details.viewCount,
      likeCount: details.likeCount,
      publishedAt: details.publishedAt, // 여기서 영상 자체의 업로드 날짜로 대체
    };
  });

  return merged;
}

export function StarData() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/API/index.json").then((response) => response.json()),
  });
}

export function bagData() {
  return useQuery({
    queryKey: ["bagData"],
    queryFn: () => fetchAllPlaylistItems(inmybag),
  });
}

export function interviewData() {
  return useQuery({
    queryKey: ["interviewData"],
    queryFn: () => fetchAllPlaylistItems(interview),
  });
}

export function workingData() {
  return useQuery({
    queryKey: ["workingData"],
    queryFn: () => fetchAllPlaylistItems(working),
  });
}

export function allData(ids = playlistIds) {
  return useQuery({
    queryKey: ["multiPlaylistData", ids],
    queryFn: () => fetchFromAllPlaylists(ids),
  });
}

export function useAllDataViews(playlistIds) {
  return useQuery({
    queryKey: ["allDataViews", playlistIds],
    queryFn: () => fetchFromAllPlaylistsWithViews(playlistIds),
  });
}

export function bagDataWithViews() {
  return useQuery({
    queryKey: ["bagDataWithViews"],
    queryFn: () => fetchFromAllPlaylistsWithViews([inmybag]),
  });
}

export function workingDataWithViews() {
  return useQuery({
    queryKey: ["workingDataWithViews"],
    queryFn: () => fetchFromAllPlaylistsWithViews([working]),
  });
}

export function interviewDataWithViews() {
  return useQuery({
    queryKey: ["interviewDataWithViews"],
    queryFn: () => fetchFromAllPlaylistsWithViews([interview]),
  });
}
