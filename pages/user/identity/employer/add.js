import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  Input,
  SimpleGrid,
  GridItem,
  Select,
  Checkbox,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

import { getPage } from "../../../../utils/page/getPage";
import withPageCMS from "../../../../utils/page/withPageCMS";
import { useAppContext } from "../../../../store/AppStore";
import { gql } from "graphql-request";
import { getGraphQLClient } from "../../../../utils/apollo";
import getSharedServerSideProps from "../../../../utils/server/getSharedServerSideProps";
import wordExtractor from "../../../../utils/wordExtractor";
import OrganizationInvitationCodeValidity from "../../../../utils/api/OrganizationInvitationCodeValidity";

const PAGE_KEY = "employer_identity_add";

export const getServerSideProps = async (context) => {
  const page = (await getPage({ key: PAGE_KEY, lang: context.locale })) ?? {};

  return {
    props: {
      page,
      isLangAvailable: context.locale === page.lang,
      ...(await getSharedServerSideProps(context))?.props,
      lang: context.locale,
    },
  };
};

const IdentityEmployerAdd = ({ page }) => {
  const router = useRouter();
  const { user } = useAppContext();

  const {
    handleSubmit,
    setError,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onFormSubmit = useCallback(
    async ({
      contactPersonName,
      contactEmailAdress,
      contactNumber,
      terms,
      invitationCode,
    }) => {
      try {
        // mutation identity create
      } catch (e) {
        console.log(e);
      }
    }
  );

  return (
    <VStack py={36}>
      
    </VStack>
  );
};

export default withPageCMS(IdentityEmployerAdd, {
  key: PAGE_KEY,
  fields: [
    {
      name: "step",
      label: "標題 step",
      component: "group",
      fields: [
        {
          name: "title",
          label: "主標題 Title",
          component: "text",
        },
        {
          name: "subTitle",
          label: "副標題 Sub title",
          component: "text",
        },
      ],
    },
    {
      name: "form",
      label: "形式 Form",
      component: "group",
      fields: [
        {
          name: "contactPersonName",
          label: "聯繫人姓名 Contact Person Name",
          component: "text",
        },
        {
          name: "contactEmailAdress",
          label: "聯繫電子郵件地址 Contact Email Address",
          component: "text",
        },
        {
          name: "contactNumber",
          label: "聯繫電話 Contact Number",
          component: "text",
        },
        {
          name: "terms",
          label: "條款和條件 T&C Label",
          component: "group",
          fields: [
            {
              name: "text",
              label: "文本 text",
              component: "text",
            },
            {
              name: "link",
              label: "關聯 Link",
              component: "text",
              placeholder:"https://"
            },
          ],
        },
        {
          name: "continue",
          label: "繼續標籤 Continue Label",
          component: "text",
        },
      ],
    },
  ],
});
