import React, { PropsWithChildren, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Box } from "@mui/material";
import { buildGraphQlEndpoint } from "util/environment";
import { Navbar } from "user/components/navbar/Navbar";
const buildApolloClient = () => {
  const httpLink = createHttpLink({
    uri: buildGraphQlEndpoint(),
    credentials: "include",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export function ApolloContainer({ children }: PropsWithChildren) {
  const client = useMemo(() => buildApolloClient(), []);

  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Navbar />
          <Box
            width="100%"
            height="100%"
            padding={1}
            marginTop="64px"
            bgcolor="background.default"
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}
