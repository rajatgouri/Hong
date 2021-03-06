import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  Input,
  SimpleGrid,
  GridItem,
  Checkbox,
  FormHelperText,
  FormLabel,
  Link
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";

import { getConfiguration } from "../../../../utils/configuration/getConfiguration";
import { getPage } from "../../../../utils/page/getPage";
import withPageCMS from "../../../../utils/page/withPageCMS";
import { useRouter } from "next/router";
import { useAppContext } from "../../../../store/AppStore";
import { gql } from "graphql-request";
import { getGraphQLClient } from "../../../../utils/apollo";
import getSharedServerSideProps from "../../../../utils/server/getSharedServerSideProps";
import wordExtractor from "../../../../utils/wordExtractor";


const PAGE_KEY = "identity_public_add";

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


const customStyles = {
  multiValue: (provided, state) => {
    const borderRadius = "15px"  
    return { ...provided, borderRadius };
  },
  multiValueRemove: (provided, state) => {
    const color = "grey"
    return {...provided, color}
  }
}


const IdentityPublicAdd = ({ page }) => {
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
      chinese_name,
      english_name,
      date_of_birth,
      gender,
      resident_district,
      industry,
      terms,
    }) => {
      try {
        const mutation = gql`
          mutation IdentityCreate($input: IdentityCreateInput!) {
            IdentityCreate(input: $input) {
              id
            }
          }
        `;

        let data = await getGraphQLClient().request(mutation, {
          input: {
            userId: user.id,
            identity: "public",
            chineseName: chinese_name,
            englishName: english_name,
            dob: date_of_birth,
            gender: gender?.value,
            district: resident_district?.value,
            interestedIndustry: industry?.map(
              ({ value }) => ({ value }?.value)
            ),
            tncAccept: terms,
            email: user.email ? user.email : "",
            phone: user.phone ? user.phone : "",
          },
        });

        if (data && data.IdentityCreate) {
          router.push(`/user/identity/public/${data.IdentityCreate.id}/success`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  return (
    <VStack py={36}>
      <Text mt={10} fontSize="16px">{page?.content?.step?.title}</Text>
      <Text  
          fontSize="36px" 
          letterSpacing="1.5px"
          fontWeight={600}
      >
        {page?.content?.step?.subTitle}
      </Text>
      <Box justifyContent="center" width="100%" marginTop="40px !important">
        <Box
          maxWidth={800}
          width="100%"
          textAlign="left"
          margin="auto"
          padding="0px 25px"
        >
          <Text fontSize="16px" textAlign="center">
            {page?.content?.heading?.description}
          </Text>
          <VStack as="form" onSubmit={handleSubmit(onFormSubmit)}>
            <SimpleGrid pt={16} columns={[1, 2, 2, 2]} spacing={4} width="100%">
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {page?.content?.form?.chineseName}{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder={wordExtractor(
                        page?.content?.wordings,
                        "chinese_name_placeholder"
                      )}
                    {...register("chinese_name", { required: true })}
                  />
                  <FormHelperText>
                    {errors?.chinese_name?.type === "required" && (
                      <Text color="red" color="red">
                        {/* ??????????????????????????? Enter valid chinese name! */}
                        {wordExtractor(
                        page?.content?.wordings,
                        "chinese_name_required"
                      )}
                      </Text>
                    )}
                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {page?.content?.form?.englishName}{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder={wordExtractor(
                      page?.content?.wordings,
                      "english_name_placeholder"
                    )}
                    {...register("english_name", { required: true })}
                  />
                  <FormHelperText>
                    {errors?.english_name?.type === "required" && (
                      <Text color="red">
                        {wordExtractor(
                        page?.content?.wordings,
                        "english_name_required"
                      )}{" "}
                      </Text>
                    )}
                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>{page?.content?.form?.dob}</FormLabel>
                  <Input
                    type="date"
                    placeholder=""
                    {...register("date_of_birth")}
                  />
                  <FormHelperText>

                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>{page?.content?.form?.gender?.label}</FormLabel>
                  <Controller
                    name="gender"
                    isClearable
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        placeholder={wordExtractor(
                          page?.content?.wordings,
                          "gender_placeholder"
                        )}
                        options={page?.content?.form?.gender?.options.map(
                          ({ label, value }) => ({ label, value })
                        )}
                      />
                    )}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>
                    {page?.content?.form?.residentRestrict?.label}
                  </FormLabel>
                  <Controller
                    name="resident_district"
                    isClearable
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        placeholder={wordExtractor(
                          page?.content?.wordings,
                          "resident_district_placeholder"
                        )}
                        options={page?.content?.form?.residentRestrict?.options.map(
                          ({ label, value }) => ({ label, value })
                        )}
                      />
                    )}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>
                    {page?.content?.form?.industry?.label}{" "}
                    <Text as="span" color="red">
                      
                    </Text>
                  </FormLabel>
                  <Controller
                    name="industry"
                    isClearable
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        styles={customStyles}
                        {...field}
                        isMulti
                        placeholder={wordExtractor(
                          page?.content?.wordings,
                          "industry_placeholder"
                        )}
                        options={page?.content?.form?.industry?.options.map(
                          ({ label, value }) => ({ label, value })
                        )}
                      />
                    )}
                  />
                  <FormHelperText>
                    {errors?.industry?.type === "required" && (
                      <Text color="red">
                        {wordExtractor(
                          page?.content?.wordings,
                          "industry_required"
                        )}
                      </Text>
                    )}{" "}
                  </FormHelperText>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            <FormControl marginTop="20px !important">
              <Checkbox
                colorScheme="green"
                {...register("terms", { required: true })}
              >
               {page?.content?.form?.terms?.text} <Link target="_blank" href={page?.content?.form?.terms?.url}>  {page?.content?.form?.terms?.link} </Link>
              </Checkbox>
              <FormHelperText>
                {errors?.terms?.type === "required" && (
                  <Text color="red">
                    {wordExtractor(
                      page?.content?.wordings,
                      "tnc_required"
                    )}
                    </Text>
                )}
              </FormHelperText>
            </FormControl>

            <FormControl textAlign="center">
              <Button
                backgroundColor="#F6D644"
                borderRadius="22px"
                height="44px"
                width="117.93px"
                type="submit"
                isLoading={isSubmitting}
              >
                {page?.content?.form?.continue}
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default withPageCMS(IdentityPublicAdd, {
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
          name: "description",
          label: "?????? Description",
          component: "text",
        },
      ],
    },
    {
      name: "form",
      label: "?????? Form",
      component: "group",
      fields: [
        {
          name: "chineseName",
          label: "????????? Chinese Name Label",
          component: "text",
        },
        {
          name: "englishName",
          label: "????????? English Name Label",
          component: "text",
        },
        {
          name: "dob",
          label: "???????????? Date of Birth ",
          component: "text",
        },
        {
          name: "gender",
          label: "?????? Gender Label",
          component: "group",
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "options",
              label: "??????  Options",
              component: "group-list",
              itemProps: ({ id: key, caption: label }) => ({
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
                  name: "value",
                  label: "?????? Value",
                  component: "text",
                },
              ],
            },
          ],
        },
        {
          name: "residentRestrict",
          label: "????????? Resident District ",
          component: "group",
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "options",
              label: "??????  Options",
              component: "group-list",
              itemProps: ({ id: key, caption: label }) => ({
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
                  name: "value",
                  label: "?????? Value",
                  component: "text",
                },
              ],
            },
          ],
        },
        {
          name: "industry",
          label: "??????/?????? Industry/Job ",
          component: "group",
          fields: [
            {
              name: "label",
              label: "?????? Label",
              component: "text",
            },
            {
              name: "options",
              label: "??????  Options",
              component: "group-list",
              itemProps: ({ id: key, caption: label }) => ({
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
                  name: "value",
                  label: "?????? Value",
                  component: "text",
                },
              ],
            },
          ],
        },
        {
          name: "terms",
          label: "??????????????? T&C Label",
          component: "group",
          fields: [
            {
              name: "text",
              label: "?????? text",
              component: "text",
            },
            {
              name: "link",
              label: "?????? Link",
              component: "text",
            },
            {
              name: "url",
              label: "?????? Url",
              component: "text",
              placeholder:"https://"
            }
          ]
        },
        {
          name: "continue",
          label: "???????????? Continue Label",
          component: "text",
        },
      ],
    },
  ],
});
