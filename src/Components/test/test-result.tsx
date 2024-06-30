"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Highlight,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
  extendTheme,
  TableContainer,
} from "@chakra-ui/react";

import {
  TestResult as ITestResult,
  getPersonalityClassGroupByTestScores,
} from "../../lib/personality-test";

// Định nghĩa theme
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      200: "#edf2f7",
      300: "#e2e8f0",
      400: "#cbd5e0",
      500: "#a0aec0",
      600: "#718096",
      700: "#4a5568",
      800: "#2d3748",
      900: "#1a202c",
    },
  },
});
// Định nghĩa kiểu dữ liệu cho props của component
interface TestResultProps {
  testResult: ITestResult;
}

// Component chính để hiển thị kết quả test tính cách
export default function TestResult(props: TestResultProps) {
  // Lấy nhóm tính cách dựa trên điểm số test
  const personalityClassGroup = getPersonalityClassGroupByTestScores(
    props.testResult.testScores
  );

  // Log kiểu tính cách (chuyển thành chữ thường) để debug
  console.log("personalityClassGroup?.type.toLowerCase()" , personalityClassGroup?.type.toLowerCase());
  
  return (
    // Container chính cho kết quả test
    <Flex
      my={4}
      w={{
        base: "full",
        lg: "50%",
      }}
      h="full"
      px={8}
      gap={4}
      alignItems="center"
      direction="column"
    >
      {/* Tiêu đề chính hiển thị kiểu và tên tính cách */}
      <Heading
        id={personalityClassGroup.type}
        as="h1"
        textAlign="center"
      >
        <Highlight
          query={personalityClassGroup.type}
          styles={{ color: "primary.500" }}
        >
          {`${personalityClassGroup.type} - ${personalityClassGroup.name}`}
        </Highlight>
      </Heading>

      {/* Mô tả ngắn về tên tính cách */}
      <Text
        fontSize="lg"
        fontWeight="bold"
        textAlign="center"
      >
        {personalityClassGroup?.nameDescription}
      </Text>

      {/* Hình ảnh minh họa cho kiểu tính cách */}
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()}.svg`}
        width={400}
        height={400}
      />

      {/* Khẩu hiệu của kiểu tính cách */}
      <Heading
        scrollMarginTop={8}
        id="description"
        as="h2"
        my={8}
        fontSize="md"
        textAlign="center"
      >
        {personalityClassGroup.epithet}
      </Heading>

      {/* Mô tả chi tiết về kiểu tính cách */}
      {personalityClassGroup.description
        .split(/\.\n+/g)
        .map((description) =>
          description.endsWith(".") ? description : `${description}.`
        )
        .map((description, index) => (
          <Text
            key={index}
            textAlign="justify"
          >
            {`${description}`}
          </Text>
        ))}

      {/* Thứ tự ưu tiên chức năng Jung */}
      <Heading
        scrollMarginTop={8}
        id="jungian-functional-preference-ordering"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
      
        Jungian Functional Preference Ordering
      </Heading>
      <Box
            as="table"
            width="100%"
            style={{ borderCollapse: 'separate', borderSpacing: 0 }}
            marginY="30px"
          >
    <TableContainer>        
  <Table variant="simple" marginY="30px">
    <Thead>
      <Tr>
        <Th
           backgroundColor="brand.600"
           color="black"
           padding="10px"
           borderTopLeftRadius="8px"
        >
          Function
        </Th>
        <Th
         backgroundColor="brand.600"
         color="black"
         padding="10px"
         borderTopLeftRadius="8px"
        >
          Description
        </Th>
      </Tr>
    </Thead>
    <Tbody>
    {Object.entries(personalityClassGroup.jungianFunctionalPreference).map(([key, value], index) => (
                <Tr key={key} backgroundColor={index % 2 === 0 ? "brand.200" : "brand.100"}>
                  <Td padding="10px" fontWeight="bold" color="brand.700">{key.charAt(0).toUpperCase() + key.slice(1)}</Td>
                  <Td padding="10px" color="brand.600">{value}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</TableContainer>
</Box>


      {/* Đặc điểm chung của kiểu tính cách */}
      <Heading
        scrollMarginTop={8}
        id="general-traits"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        {`${personalityClassGroup.type} General Traits`}
       
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+1}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <UnorderedList  >
        {personalityClassGroup.generalTraits.map((trait, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
          >
            {trait}
          </ListItem>
        ))}
      </UnorderedList>

      {/* Điểm mạnh trong mối quan hệ */}
      <Heading
        scrollMarginTop={8}
        id="relationship-strengths"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Relationship Strengths

     
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+2}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <UnorderedList w="full">
        {personalityClassGroup.relationshipStrengths.map(
          (relationshipStrength, index) => (
            <ListItem
              my={2}
              key={index}
              textAlign="justify"
            >
              {relationshipStrength}
            </ListItem>
          )
        )}
      </UnorderedList>


      {/* Điểm yếu trong mối quan hệ */}
      <Heading
        scrollMarginTop={8}
        id="relationship-weaknesses"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Relationship Weaknesses
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+3}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <UnorderedList w="full">
        {personalityClassGroup.relationshipWeaknesses.map(
          (relationshipWeakness, index) => (
            <ListItem
              my={2}
              key={index}
              textAlign="justify"
            >
              {relationshipWeakness}
            </ListItem>
          )
        )}
      </UnorderedList>

      {/* Định nghĩa thành công của kiểu tính cách */}
      <Heading
        scrollMarginTop={8}
        id="success-definition"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Success Definition
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+4}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {personalityClassGroup.successDefinition
        .split(/\.\n+/g)
        .map((successDefinition) =>
          successDefinition.endsWith(".")
            ? successDefinition
            : `${successDefinition}.`
        )
        .map((successDefinition, index) => (
          <Text
            key={index}
            textAlign="justify"
          >
            {`${successDefinition}`}
          </Text>
        ))}

      {/* Điểm mạnh của kiểu tính cách */}
      <Heading
        scrollMarginTop={8}
        id="strengths"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Strengths
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.strengths.map((strength, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
          >
            {strength}
          </ListItem>
        ))}
      </UnorderedList>

      {/* Tài năng đặc biệt của kiểu tính cách */}
      <Heading
        scrollMarginTop={8}
        id="special-gifts"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Special Gifts
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.gifts.map((gift, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
          >
            {gift}
          </ListItem>
        ))}
      </UnorderedList>

      {/* Các lĩnh vực có thể gặp vấn đề */}
      <Heading
        scrollMarginTop={8}
        id="potential-problem-areas"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Potential Problem Areas
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+5}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {personalityClassGroup.potentialProblemAreas.length === 1 ? (
        personalityClassGroup.potentialProblemAreas[0]
          .split(/\.\n+/g)
          .map((potentialProblemArea) =>
            potentialProblemArea.endsWith(".")
              ? potentialProblemArea
              : `${potentialProblemArea}.`
          )
          .map((potentialProblemArea, index) => (
            <Text
              key={index}
              textAlign="justify"
              alignSelf="start"
            >
              {`${potentialProblemArea}`}
            </Text>
          ))
      ) : (
        <UnorderedList w="full">
          {personalityClassGroup.potentialProblemAreas.map(
            (potentialProblemArea, index) => (
              <ListItem
                my={2}
                key={index}
                textAlign="justify"
              >
                {potentialProblemArea}
              </ListItem>
            )
          )}
        </UnorderedList>
      )}

      {/* Giải thích về các vấn đề */}
      <Heading
        scrollMarginTop={8}
        id="explanation-of-problems"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Explanation of Problems
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+6}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {personalityClassGroup.explanationOfProblems
        .split(/\.\n+/g)
        .map((explanationOfProblem) =>
          explanationOfProblem.endsWith(".")
            ? explanationOfProblem
            : `${explanationOfProblem}.`
        )
        .map((explanationOfProblem, index) => (
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
          >
            {`${explanationOfProblem}`}
          </Text>
        ))}

      {/* Giải pháp cho các vấn đề */}
      <Heading
        scrollMarginTop={8}
        id="solutions"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Solutions
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+7}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {personalityClassGroup.solutions
        .split(/\.\n+/g)
        .map((solution) => (solution.endsWith(".") ? solution : `${solution}.`))
        .map((solution, index) => (
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
          >
            {`${solution}`}
          </Text>
        ))}

      {/* Mẹo sống hạnh phúc */}
      <Heading
        scrollMarginTop={8}
        id="living-happily-tips"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Living Happily Tips
      </Heading>
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+8}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {personalityClassGroup.livingHappilyTips
        .split(/\.\n+/g)
        .map((tips) => (tips.endsWith(".") ? tips : `${tips}.`))
        .map((tips, index) => (
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
          >
            {`${tips}`}
          </Text>
        ))}

      {/* Gợi ý cụ thể (nếu chỉ có một gợi ý) */}
      {personalityClassGroup.suggestions !== undefined &&
        personalityClassGroup.suggestions.length === 1 && (
          <>
            <Heading
              scrollMarginTop={8}
              id="specific-suggestions"
              my={4}
              as="h2"
              size="md"
              textAlign="center"
            >
              Specific Suggestions
            </Heading>
            <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+9}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
            {personalityClassGroup.suggestions[0]
              .split(/\.\n+/g)
              .map((suggestion) =>
                suggestion.endsWith(".") ? suggestion : `${suggestion}.`
              )
              .map((suggestion, index) => (
                <Text
                  key={index}
                  textAlign="justify"
                  alignSelf="start"
                >
                  {`${suggestion}`}
                </Text>
              ))}
          </>
        )}

      {/* Gợi ý cụ thể (nếu có nhiều gợi ý) */}
      {personalityClassGroup.suggestions !== undefined &&
        personalityClassGroup.suggestions.length > 1 && (
          <>
            <Heading
              scrollMarginTop={8}
              id="specific-suggestions"
              my={4}
              as="h2"
              size="md"
              textAlign="center"
            >
              Specific Suggestions
            </Heading>
            <UnorderedList w="full">
              {personalityClassGroup.suggestions!.map((suggestion, index) => (
                <ListItem
                  my={2}
                  key={index}
                  textAlign="justify"
                >
                  {suggestion}
                </ListItem>
              ))}
            </UnorderedList>
          </>
        )}

      {/* Mười quy tắc sống để đạt được thành công */}
      <Heading
        scrollMarginTop={8}
        id="ten-rules-to-live-to-achieve-success"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
      >
        Ten Rules to Live to Achieve Success
      </Heading>
      
      <Image
        alt="illustration"
        src={`/images/${personalityClassGroup?.type.toLowerCase()+10}.svg`}
        width={600}
        height={500}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <UnorderedList w="full">
        {personalityClassGroup.tenRulesToLive.map((rule, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
          >
            {rule}
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
}
      
      