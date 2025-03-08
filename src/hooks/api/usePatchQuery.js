import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/services/api";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const patchRequest = (url, attributes) => request.patch(url, attributes);

const usePatchQuery = ({ hideSuccessToast = false, listKeyId = null }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    ({ url, attributes }) => patchRequest(url, attributes),
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

export default usePatchQuery;
