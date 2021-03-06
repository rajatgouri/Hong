import { Divider, HStack, Text } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Image,
  Link,
  SimpleGrid,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import withConfigurationCMS from "../utils/configuration/withConfigurationCMS";
import Container from "./Container";
import NextLink from "next/link";

const Footer = ({ footer }) => {
  return (
    <Box py={8}>
      <Container>
        <VStack align="stretch">
          <VStack align="stretch" spacing={8}>
            {footer?.partnerSection?.map(({ id, title, partners = [] }) => {
              return (
                <Stack
                  spacing={4}
                  align={["start", "start", "center"]}
                  direction={["column", "column", "row", "row"]}
                  key={id}
                >
                  <Box w="150px" color="gray.500">
                    {title}
                  </Box>
                  <Wrap spacing={8} align="center">
                    {(partners ?? []).map(
                      ({ id: _id, label, url, logo = "" }) => {
                        return (
                          <WrapItem key={_id} maxH={12}>
                            <Link href={url} key={_id}>
                              <Image
                                alt={label}
                                maxH={12}
                                h="100%"
                                src={logo}
                              />
                            </Link>
                          </WrapItem>
                        );
                      }
                    )}
                  </Wrap>
                </Stack>
              );
            })}
          </VStack>
          <Divider pt={8} />
          <Stack
            pt={8}
            spacing={8}
            align={"start"}
            direction={["column", "column", "row", "row"]}
            spacing={8}
          >
            <Box>
              <Image maxW={150} src={footer?.logo} />
            </Box>

            <SimpleGrid
              flex={1}
              minW={0}
              w="100%"
              columns={[2, 2, 3, 5, 5]}
              gap={[8,12]}
              padding="0 2%"
            >
              {(footer?.sitemap ?? []).map(({ id, links = [], title, url = "/", social= [] }) => (
                <VStack key={id} align="start">
                  <NextLink href={url}>
                    <Button
                      textAlign="left"
                      variant="link"
                      color="black"
                      fontWeight="bold"
                      fontSize={["xl", "xl", "lg"]}
                    >
                      {title}
                    </Button>
                  </NextLink>
                  <Text w="100%">
                  {
                    (social ?? []).map(({icon, id, url})=>{
                      return <a href={url}><Image display="inline-flex" src={icon} height="30px"></Image></a>
                    })
                  }
                  </Text>
                  
                  {(links ?? []).map(({ id: _id, url = "/", label = "" }) => {
                    return (
                      <NextLink id={_id} href={url}>
                        <Button
                          fontSize={["xl", "xl", "lg"]}
                          textAlign="left"
                          variant="link"
                          fontWeight="normal"
                          color="black"
                        >
                          {label}
                        </Button>
                      </NextLink>
                    );
                  })}
                </VStack>
              ))}
            </SimpleGrid>
          </Stack>

          <HStack pt={16} alignSelf="center">
            {footer?.links?.map(({ id, label, url = "/" }) => {
              return (
                <Link key={id} href={url} target="blank">
                  {label}
                </Link>
              );
            })}
          </HStack>
          <Text alignSelf="center">{footer?.copyright}</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default withConfigurationCMS(Footer, {
  key: "footer",
  label: "?????? Footer",
  fields: [
    {
      name: "title",
      label: "title",
      component: "text",
    },

    {
      label: "?????? Logo Programme Logo",
      name: "logo",
      component: "image",
      uploadDir: () => "/footer/logos",
      parse: ({ previewSrc }) => previewSrc,
      previewSrc: (src) => src,
    },

    {
      name: "partnerSection",
      label: "?????????????????? Partners",
      component: "group-list",
      itemProps: ({ id: key, title: label }) => ({
        key,
        label,
      }),
      defaultItem: () => ({
        id: Math.random().toString(36).substr(2, 9),
      }),
      fields: [
        {
          name: "title",
          component: "text",
          label: "?????? Title",
        },
        {
          name: "partners",
          label: "????????????",
          component: "group-list",
          itemProps: ({ id: key, label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              label: "?????? Logo",
              name: "logo",
              component: "image",
              uploadDir: () => "/footer/logos",
              parse: ({ previewSrc }) => previewSrc,
              previewSrc: (src) => src,
            },
            {
              name: "url",
              label: "?????? Url",
              placeholder: "https://",
              component: "text",
            },
          ],
        },
      ],
    },

    {
      name: "sitemap",
      label: "???????????? Sitemap",
      component: "group-list",
      itemProps: ({ id: key, title: label }) => ({
        key,
        label,
      }),
      defaultItem: () => ({
        id: Math.random().toString(36).substr(2, 9),
      }),
      fields: [
        {
          name: "title",
          component: "text",
          label: "?????? Title",
        },
        {
          name: "url",
          label: "?????? Url",
          placeholder: "https://",
          component: "text",
        },
        {
          name: "links",
          label: "?????? Links",
          component: "group-list",
          itemProps: ({ id: key, label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "url",
              label: "?????? Url",
              placeholder: "https://",
              component: "text",
            },
          ],
        },
        {
          name: "social",
          label: "????????? Social",
          component: "group-list",
          itemProps: ({ id: key, label }) => ({
            key,
            label,
          }),
          defaultItem: () => ({
            id: Math.random().toString(36).substr(2, 9),
          }),
          fields: [
            {
              label: "?????? Icon",
              name: "icon",
              component: "image",
              uploadDir: () => "/footer/icon",
              parse: ({ previewSrc }) => previewSrc,
              previewSrc: (src) => src,
            },
            {
              name: "url",
              label: "?????? Url",
              placeholder: "https://",
              component: "text",
            },
          ],
        },
      ],
    },

    {
      name: "links",
      label: "??????",
      component: "group-list",
      itemProps: ({ id: key, label }) => ({
        key,
        label,
      }),
      defaultItem: () => ({
        id: Math.random().toString(36).substr(2, 9),
      }),
      fields: [
        {
          name: "label",
          label: "?????? Label",
          component: "text",
        },
        {
          name: "url",
          label: "?????? Url",
          placeholder: "https://",
          component: "text",
        },
      ],
    },
    {
      name: "copyright",
      label: "????????????",
      component: "text",
    },
  ],
});
