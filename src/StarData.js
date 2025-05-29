import { useQuery } from "@tanstack/react-query";
export function StarData() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/API/index.json").then((response) => response.json()),
  });
}
