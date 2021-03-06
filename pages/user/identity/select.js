import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { getPage } from "../../../utils/page/getPage";
import withPageCMS from "../../../utils/page/withPageCMS";
import Link from "next/link";
import { useEffect, useState } from "react";
import getSharedServerSideProps from "../../../utils/server/getSharedServerSideProps";
import { useAppContext } from "../../../store/AppStore";
import router, { useRouter } from "next/router";
import { useCredential } from "../../../utils/user";
const PAGE_KEY = "identity_select";

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

const IdentitySelect = ({ page }) => {
  const [selectedRole, setSelectedRole] = useState("/user/identity/pwd/add");
  const { user } = useAppContext();
  const router = useRouter();
  const [setCredential, removeCredential] = useCredential();

  const logout = () => {
    removeCredential();
    router.push("/");
  };

  const onRoleSelect = (e, role) => {
    let elements = document.getElementsByClassName("box");
    resetSelectedRole(elements, elements.length);

    e.currentTarget.style.backgroundColor = "#F6D644";
    setSelectedRole(role);
  };

  const resetSelectedRole = (elements, value) => {
    for (let i = 0; i < value; i++) {
      elements[i].style.backgroundColor = "#ffffff";
    }
  };

  return (
    <VStack py={36}>
      <Text>{page?.content?.step?.title}</Text>
      <Text fontSize="36px" fontWeight={600} letterSpacing="1.5px">
        {page?.content?.step?.subTitle}
      </Text>
      <Box justifyContent="center" width="100%" marginTop="40px !important">
        <Box
          maxWidth={1100}
          width="100%"
          textAlign="left"
          margin="auto"
          marginTop="50px"
          borderRadius="20px"
          background="#f8f8f8"
          padding="25px"
        >
          <Heading as="h4" textAlign="center">
            {page?.content?.heading?.title}
          </Heading>
          <SimpleGrid pt={16} columns={[1, 1, 2, 3]} spacing={8}>
            <GridItem>
              <Box
                minHeight="320px"
                textAlign="center"
                padding="15%"
                className="box"
                borderRadius="20px"
                backgroundColor="#F6D644"
                onClick={(e) => {
                  onRoleSelect(e, "/user/identity/pwd/add");
                }}
              >
                <Image
                  height="150px"
                  width="150px"
                  margin="auto"
                  src={page?.content?.pwd?.image}
                />
                <Text
                  marginTop="20px !important"
                  width="190px"
                  margin="auto"
                  fontWeight={600}
                  letterSpacing="1.5px"
                >
                  {page?.content?.pwd?.title}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                minHeight="320px"
                textAlign="center"
                padding="15%"
                className="box"
                borderRadius="20px"
                backgroundColor="#FFFFFF"
                onClick={(e) => {
                  onRoleSelect(e, "/user/identity/employer/add");
                }}
              >
                <Image
                  height="150px"
                  width="150px"
                  margin="auto"
                  src={page?.content?.employeer?.image}
                />
                <Text
                  marginTop="20px !important"
                  width="190px"
                  margin="auto"
                  fontWeight={600}
                  letterSpacing="1.5px"
                >
                  {page?.content?.employeer?.title}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                minHeight="320px"
                textAlign="center"
                padding="15%"
                className="box"
                borderRadius="20px"
                backgroundColor="#FFFFFF"
                onClick={(e) => {
                  onRoleSelect(e, "/user/identity/staff/add");
                }}
              >
                <Image
                  height="150px"
                  width="150px"
                  margin="auto"
                  src={page?.content?.ngo?.image}
                />
                <Text
                  marginTop="20px !important"
                  width="190px"
                  margin="auto"
                  fontWeight={600}
                  letterSpacing="1.5px"
                >
                  {page?.content?.ngo?.title}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                minHeight="320px"
                textAlign="center"
                padding="15%"
                borderRadius="20px"
                className="box"
                backgroundColor="#FFFFFF"
                borderRadius="20px"
                onClick={(e) => {
                  onRoleSelect(e, "/user/identity/public/add");
                }}
              >
                <Image
                  height="150px"
                  width="150px"
                  margin="auto"
                  src={page?.content?.public?.image}
                />
                <Text
                  marginTop="20px !important"
                  width="190px"
                  margin="auto"
                  fontWeight={600}
                  letterSpacing="1.5px"
                >
                  {page?.content?.public?.title}
                </Text>
              </Box>
            </GridItem>
          </SimpleGrid>
          <Box textAlign="center" marginTop="60px">
            <Link href={selectedRole}>
              <Button
                backgroundColor="#F6D644"
                borderRadius="22px"
                height="44px"
                marginBottom="20px"
                fontWeight={600}
                width="117.93px"
              >
                {page?.content?.footer?.button}
              </Button>
            </Link>
            <br />

            <Text as="span" marginTop="40px">
              {page?.content?.footer?.drop?.text}
              <Text as="span" cursor="pointer" onClick={logout}>
                {page?.content?.footer?.drop?.button}
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default withPageCMS(IdentitySelect, {
  key: PAGE_KEY,
  fields: [
    {
      name: "step",
      label: "?????? step",
      component: "group",
      fields: [
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
        {
          name: "subTitle",
          label: "????????? Sub title",
          component: "text",
        },
      ],
    },
    {
      name: "heading",
      label: "?????? Heading",
      component: "group",
      fields: [
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "pwd",
      label: "???????????? PWD",
      component: "group",
      fields: [
        {
          label: "?????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/identity",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "employeer",
      label: "?????? Employeer",
      component: "group",
      fields: [
        {
          label: "?????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/identity",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "ngo",
      label: "??????????????? NGO",
      component: "group",
      fields: [
        {
          label: "?????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/identity",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "public",
      label: "?????? Public",
      component: "group",
      fields: [
        {
          label: "?????? Image",
          name: "image",
          component: "image",
          uploadDir: () => "/identity",
          parse: ({ previewSrc }) => previewSrc,
          previewSrc: (src) => src,
        },
        {
          name: "title",
          label: "????????? Title",
          component: "text",
        },
      ],
    },
    {
      name: "footer",
      label: "?????? Footer",
      component: "group",
      fields: [
        {
          name: "button",
          label: "????????? Title",
          component: "text",
        },
        {
          name: "drop",
          label: "?????? Drop",
          component: "group",
          fields: [
            {
              name: "text",
              label: "?????? Text",
              component: "text",
            },
            {
              name: "button",
              label: "???????????? Button text",
              component: "text",
            },
          ],
        },
      ],
    },
  ],
});
