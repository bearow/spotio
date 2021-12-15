import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

interface UserWithPlaylist extends User {
  playlistsCount?: number;
}

export const useMe = () => {
  const { data, error } = useSWR<UserWithPlaylist>("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: Boolean(error),
  };
};

export const usePlaylists = () => {
  const { data, error } = useSWR<Playlist[]>("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: Boolean(error),
  };
};
