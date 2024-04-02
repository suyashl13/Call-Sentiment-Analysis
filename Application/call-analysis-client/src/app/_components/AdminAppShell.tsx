"use client";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { FiHome, FiLogOut, FiMenu, FiPhoneCall, FiUser } from "react-icons/fi";
import { useAuth } from "../_providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/assets/logo.png";

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const { user, status } = useAuth();
  const { replace } = useRouter();

  const NavItem = ({ ...props }) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = ({ ...props }) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Image
          alt="brand-logo"
          width={150}
          style={{ marginLeft: "0.6rem" }}
          src={logo}
        />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Link href="/admin">
          <NavItem icon={FiHome}>Home</NavItem>
        </Link>
        <Link href="/admin/employees">
          <NavItem icon={FiUser}>Employee Management</NavItem>
        </Link>
        <Link href="/admin/calls">
          <NavItem icon={FiPhoneCall}>Calls</NavItem>
        </Link>
        <Box color="red.500">
          <NavItem
            onClick={async function () {
              try {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/auth/logout`, {
                  credentials: "include",
                  method: "GET",
                });
              } catch (error) {
                document.cookie = "";
              }
              replace("/sign-in");
            }}
            icon={FiLogOut}
          >
            Logout
          </NavItem>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Box>
            {status !== "loading" ? (
              <Text>
                <Text fontWeight="bold" as="span">
                  Admin Panel
                </Text>
              </Text>
            ) : null}
          </Box>
          <Flex align="center">
            {status === "authenticated" ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar
                    ml="4"
                    size="sm"
                    name="profile-avatar"
                    src={user?.profilePicture ?? "https://bit.ly/dan-abramov"}
                    cursor="pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <Text fontWeight="bold">{user?.name}</Text>
                  </PopoverHeader>
                  <PopoverBody>
                    <Flex flexDir='row' justify='space-between'>
                    <Text fontSize="small">{user?.email}</Text>
                    <Text color={!user
                        ? "red"
                        : user.isActive
                        ? "green"
                        : "red"} fontSize="small">
                      {!user
                        ? "Loading"
                        : user.isActive
                        ? "Active"
                        : "Not Active"}
                    </Text>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Spinner />
            )}
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
