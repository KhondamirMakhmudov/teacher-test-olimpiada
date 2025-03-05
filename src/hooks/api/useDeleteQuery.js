import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const deleteRequest = (url) => request.delete(url);

const useDeleteQuery = ({ hideSuccessToast = false, listKeyId = null }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    (url) => deleteRequest(url),
    {
      onSuccess: (data) => {
        if (!hideSuccessToast) {
          toast.success(t(data?.data?.message) || t("SUCCESS"));
        }

        if (listKeyId) {
          queryClient.invalidateQueries(listKeyId);
        }
      },
      onError: (data) => {
        toast.error(t(data?.response?.data?.message) || t("ERROR"));
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export default useDeleteQuery;
