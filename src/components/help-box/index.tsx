import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['FarmOwner'];
  const roles = ['FarmOwner', 'FarmManager', 'AgriculturalSpecialist', 'Admin', 'FarmWorker'];
  const applicationName = 'FarmIntel';
  const tenantName = 'Farm';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `FarmOwner:
1. As a FarmOwner, I want to be able to create and manage my farm's profile on the platform, so that I can have a centralized place to store and access all farm-related information.
2. As a FarmOwner, I want to be able to view and analyze data-driven recommendations for crop cultivation, so that I can make informed decisions about which crops to grow and when to plant them.
3. As a FarmOwner, I want to be able to monitor the health of my livestock, so that I can take appropriate action to ensure their well-being and productivity.
4. As a FarmOwner, I want to be able to assign tasks to FarmManagers and AgriculturalSpecialists, so that I can delegate responsibilities and ensure efficient farm operations.
5. As a FarmOwner, I want to be able to track the progress of farm-related administrative tasks, so that I can ensure they are completed on time and in compliance with regulations.

FarmManager:
1. As a FarmManager, I want to be able to access and update the farm's profile, so that I can keep the information up-to-date and accurate.
2. As a FarmManager, I want to be able to view and analyze data-driven recommendations for crop cultivation, so that I can make informed decisions about which crops to grow and when to plant them.
3. As a FarmManager, I want to be able to monitor the health of the livestock, so that I can take appropriate action to ensure their well-being and productivity.
4. As a FarmManager, I want to be able to assign tasks to AgriculturalSpecialists and FarmWorkers, so that I can delegate responsibilities and ensure efficient farm operations.
5. As a FarmManager, I want to be able to track the progress of farm-related administrative tasks, so that I can ensure they are completed on time and in compliance with regulations.

AgriculturalSpecialist:
1. As an AgriculturalSpecialist, I want to be able to access and update the farm's profile, so that I can keep the information up-to-date and accurate.
2. As an AgriculturalSpecialist, I want to be able to view and analyze data-driven recommendations for crop cultivation, so that I can provide expert advice to the FarmOwner and FarmManager.
3. As an AgriculturalSpecialist, I want to be able to monitor the health of the livestock, so that I can provide expert advice on their well-being and productivity.
4. As an AgriculturalSpecialist, I want to be able to assign tasks to FarmWorkers, so that I can delegate responsibilities and ensure efficient farm operations.
5. As an AgriculturalSpecialist, I want to be able to track the progress of farm-related administrative tasks, so that I can ensure they are completed on time and in compliance with regulations.

Admin:
1. As an Admin, I want to be able to manage user accounts and permissions, so that I can ensure the right people have access to the appropriate information and tools.
2. As an Admin, I want to be able to monitor the overall performance of the platform, so that I can identify and address any issues or areas for improvement.
3. As an Admin, I want to be able to manage and update the platform's features and functionality, so that I can ensure it continues to meet the needs of its users.

FarmWorker:
1. As a FarmWorker, I want to be able to view and complete assigned tasks, so that I can contribute to the efficient operation of the farm.
2. As a FarmWorker, I want to be able to report any issues or concerns related to crop cultivation or livestock health, so that the appropriate action can be taken.
3. As a FarmWorker, I want to be able to access relevant information and resources, so that I can perform my tasks effectively and efficiently.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
