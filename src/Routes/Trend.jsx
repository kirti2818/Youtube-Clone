import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import pfp from "./pfp.json"


const Trending = async () => {
  const res = await fetch(
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=in&maxResults=24&key=AIzaSyA_xlPT9V_2FH3P55oMXuawYs0QHPu3E7E"
  );

  const data = await res.json();
  return data;
};
function Trend() {
  const [data, setData] = useState([]);
  const items = data.items;
  const icon = pfp.images

  useEffect(() => {
    handleTheTrending();
  }, []);

  const handleTheTrending = async () => {
    const append = await Trending();
    setData(append.items);
  };
  console.log(data);
  return (
    <div style={{ margin: 0, padding: 0 }} className="trending">
      <Navbar />
      {/* <SideBar /> */}
      <Box ml={2} overflowX={"hidden"}>
        <SideBar/>
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          gap={4}
          ml={{ base: "40px", sm: "0px", md: "70px", lg: "70px" }}
          mt={{ base: "10px", sm: "10px", md: "0px", lg: "00px" }}
          mr={2}
        >
          {data.map((user, i) => {
            return (
              <Link to={`/video/${user.id}`}>
                <Box key={i}>
                  <Box>
                    <Image
                      borderRadius={10}
                      objectFit={"cover"}
                      src={user.snippet.thumbnails.high.url}
                      h={"155px"}
                      w={300}
                    />
                  </Box>
                  <Flex >
                    <Box>
                      <Image
                      mt={3}
                      ml={2}
                        src={icon[(24-i)].img}
                        borderRadius={700}
                        height={"35px"}
                        width={"35px"}
                      />
                    </Box>
                    <Box mb={2} overflow="hidden" w="220px" h="50px" p={2}>
                      <Text
                        textAlign={"left"}
                        color={"white"}
                        mt={1}
                        ml={"10px"}
                        fontSize="12px"
                      >
                        {user.snippet.title}
                      </Text>
                    </Box>
                  </Flex>

                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default Trend;
