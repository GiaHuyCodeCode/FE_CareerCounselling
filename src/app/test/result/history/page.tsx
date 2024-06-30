"use client"

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { Option, AsyncData, Result } from "@swan-io/boxed";
import { Flex, Text } from "@chakra-ui/react";


import {
  TestResult,
  getAllSavedTestResult,
} from "../../../../lib/personality-test";
import MainLayout from "@/src/Components/layouts/main-layout";
import TestResultHistory from "@/src/Components/test/test-result-history";
import { useRouter } from "next/navigation";

export default function TestResultHistoryPage() {
  const router = useRouter();

  const [testResults, setTestResults] = useState<
    AsyncData<Result<Option<TestResult[]>, Error>>
  >(AsyncData.NotAsked());

  useEffect(() => {
    // router.isReady
    if (router) {
      setTestResults(AsyncData.Loading());

      getAllSavedTestResult().tap((result) =>
        setTestResults(AsyncData.Done(result))
      );
    }
  }, [router]);

  return (
    <MainLayout>
      {testResults.match({
        NotAsked: () => <Text>Loading</Text>,
        Loading: () => <Text>Loading</Text>,
        Done: (result) =>
          result.match({
            Error: () => <Text>Something went wrong! Please refresh!</Text>,
            Ok: (value) =>
              value.match({
                Some: (data) => <TestResultHistory testResults={data} />,
                None: () => <Text>No Data</Text>,
              }),
          }),
      })}
    </MainLayout>
  );
}
