"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount <= 1) {
    return null;
  }

  const changePage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex gap="4" align="center" width="100%" justify="end" mt="4">
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text>
        Page {currentPage} of {pagesCount}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === pagesCount}
        onClick={changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pagesCount}
        onClick={changePage(pagesCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
