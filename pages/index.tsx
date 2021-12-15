import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();
  return (
    <GradientLayout
      color="pink"
      subtitle="profile"
      // TODO add first and last name for signup as required
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      // TODO add avatar for the user in db and for signup/account settings
      image="https://ca.slack-edge.com/T714SPGHM-U010VECT4HZ-c4f16438d717-512"
      roundImage
    >
      <Box color="white">
        <Box marginBottom="30px">
          <Text fontSize="xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="sm">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box width="20%" paddingX="20px">
              <Box
                bgColor="rgba(0,0,0,0.1)"
                borderRadius="4px"
                padding="10px"
                width="100%"
              >
                <Image
                  src="https://www.zooplus.pl/magazyn/wp-content/uploads/2017/12/maine-coon.jpg"
                  borderRadius="100%"
                />
                <Box>
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
