import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings(){
    const { data, isLoading: settingLoading } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
      });
      return {data,settingLoading}
}

export default useSettings