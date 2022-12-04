import {
  Box,
  Flex,
  Spacer,
  Image,
  Input,
  Text,
  Button,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  useMediaQuery,
  InputGroup,
  InputRightElement,
  Collapse,
} from "@chakra-ui/react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ImSearch } from "react-icons/im";
import { SearchIcon } from "@chakra-ui/icons";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Context/AuthContext";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";


const getData = async (value) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=13&q=${value}&key=AIzaSyA_xlPT9V_2FH3P55oMXuawYs0QHPu3E7E`
  );

  const data = await res.json();

  return data;
};

function Navbar() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [trend, setTrending] = useState([]);
  const btnRef = React.useRef();
  const { setCart, checkOut } = useContext(cartContext);
  const navigate = useNavigate();
  const [isLargerThan800] = useMediaQuery("(min-width: 520px)");
  const [show, setShow] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  // console.log(setCart)

  useEffect(() => {
    handleTheData();
  }, [value]);

  const handleTheData = async () => {
    setData([]);
    const append = await getData(value);
    setData(append.items);
    console.log("data", data);
    // const append = await getMovies(value)
    // setData(append.Search)
  };
  console.log("data", data);
  console.log(value);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      setCart([]);
      setCart(data);
      navigate("/search");
    }
  };

  return (
    <Box className="fixed" >
      <Box>
        <Text color={"white"}>
          {isLargerThan800 ? (
            <Flex m={3} backgroundColor={"black"}>
              <Flex>
                <Link to="/">
                  <Image
                    width={125}
                    h={10}
                    ml={{base:1,md:0,lg:5}}
                    src="https://i.postimg.cc/zvq93H2b/youtube.gif"
                    alt=""
                  />
                </Link>
              </Flex>
              <Spacer />
              <Box>
                <Input
                  width={{base:180,md:350,lg:500}}
                  mt={2}
                  placeholder="Search"
                  color="grey"
                  borderLeftRadius={20}
                  borderRightRadius={0}
                  border="1px"
                  onChange={(e) => setValue(e.target.value)}
                  borderColor="grey"
                  onKeyPress={(event) => handleKeyPress(event)}
                />
                <Button
                  mt={-1.5}
                  background="none"
                  borderRightRadius={20}
                  border="1px"
                  borderColor={"grey"}
                  borderLeftRadius={0}
                  colorScheme="gray"
                >
                  {value.length === 0 ? (
                    <SearchOutlinedIcon
                      backround="none"
                      style={{ color: "grey", background: "none" }}
                    />
                  ) : (
                    <Text onClick={() => setValue("")} background={"none"}>
                      <CloseIcon
                        style={{ color: "grey", background: "none" }}
                      />
                    </Text>
                  )}
                </Button>
                {value.length !== 0 && (
                  <Box
                    position={"absolute"}
                    mt={1}
                    h={300}
                    width={560}
                    backgroundColor={"white"}
                    borderRadius={10}
                    className="suggest"
                  >
                    {data.map((user, i) => (
                      <Link to={`/video/${user.id.videoId}`} key={i}>
                        <Box backgroundColor={"white"} overflow={"hidden"}>
                          <Text
                            m={3}
                            textAlign={"left"}
                            backgroundColor={"white"}
                            color={"black"}
                          >
                            {user.snippet.title}
                          </Text>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                )}
              </Box>
              <Spacer />
              <Box>
                <Button
                  mr={1}
                  background={"none"}
                  mt={2}
                  borderRadius={50}
                  h={10}
                  w={10}
                >
                  {" "}
                  <VideoCallOutlinedIcon
                    style={{ color: "grey", background: "none" }}
                  />
                </Button>
                <Button
                  mr={1}
                  background={"none"}
                  mt={2}
                  borderRadius={50}
                  h={10}
                  w={10}
                >
                  {" "}
                  <NotificationAddOutlinedIcon
                    style={{ color: "grey", background: "none" }}
                  />
                </Button>
              </Box>
              <Box>
                <Image
                  mt={2}
                  src="https://i.pinimg.com/564x/a8/43/fa/a843fa95fc0d8d9a9b0b333edccbc7e1.jpg"
                  borderRadius={700}
                  height={10}
                  width={10}
                />
              </Box>
              {/* Mobile  */}
            </Flex>
          ) : (
            <Box zIndex={2} p={1} position={"fixed"} bgSize={"cover"} w={{base:"360px",sm:"500px"}}>
              <Flex justifyContent={"space-between"} position={"relative"} >
                <Box>
                  {/* Youtube logo  */}
                  <Link to="/">
                    <Image
                      position={"center"}
                      alignItems={"center"}
                      width={100}
                      h={"30px"}
                      src="https://i.postimg.cc/zvq93H2b/youtube.gif"
                      alt=""
                    />
                  </Link>
                </Box>
                <Flex>
                <Box ml={9}>
                  <Button background={"none"} borderRadius={50} mr={-5}>
                    {" "}
                    <VideoCallOutlinedIcon
                      style={{
                        color: "grey",
                        background: "none",
                        height: "25px",
                        width: "25px",
                      }}
                    />
                  </Button>
                  <Button background={"none"} borderRadius={50}>
                    {" "}
                    <NotificationAddOutlinedIcon
                      style={{
                        color: "grey",
                        background: "none",
                        height: "25px",
                        width: "25px",
                      }}
                    />
                  </Button>
                  <Button
                    _hover={{ background: "none" }}
                    bg={"none"}
                    onClick={onToggle}
                    ml={-5}
                    background={"none"}
                    borderRadius={50}
                  >
                    {" "}
                    <SearchOutlinedIcon
                      style={{
                        color: "grey",
                        background: "none",
                        height: "30px",
                        width: "25px",
                      }}
                    />
                  </Button>
                </Box>
                <Box ml={-5}>
                  <Image
                    src="https://i.pinimg.com/564x/a8/43/fa/a843fa95fc0d8d9a9b0b333edccbc7e1.jpg"
                    borderRadius={700}
                    height={"25px"}
                    mt={2}
                    ml={4}
                    mr={1}
                    width={"25px"}
                  />
                </Box>
                </Flex>
              </Flex>
              {/* Input  */}
              <Collapse in={isOpen} animateOpacity>
                <Flex width={"90%"} m={"auto"}>
                  <Input
                    mb={1}
                    size={"sm"}
                    borderLeftRadius={20}
                    width={"90%"}
                    borderColor={"gray.400"}
                    color="grey"
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(event) => handleKeyPress(event)}
                  />
                  <Button
                    borderRightRadius={20}
                    background="none"
                    border="1px"
                    borderColor={"grey"}
                    colorScheme="gray"
                    borderLeftRadius={0}
                    bg={"none"}
                    size={"sm"}
                  >
                    {value.length === 0 ? (
                      <SearchOutlinedIcon
                        backround="none"
                        style={{ color: "grey", background: "none" }}
                      />
                    ) : (
                      <Text onClick={() => setValue("")} background={"none"}>
                        <CloseIcon
                          style={{ color: "grey", background: "none" }}
                        />
                      </Text>
                    )}
                  </Button>
                </Flex>
                {value.length !== 0 && (
                  <Box
                    position={"absolute"}
                    h={300}
                    width={"87%"}
                    backgroundColor={"white"}
                    borderRadius={10}
                    className="suggest"
                    // overflow={"hidden"}
                  >
                    {data.map((user, i) => (
                      <Link to={`/video/${user.id.videoId}`} key={i}>
                        <Box backgroundColor={"white"} h={7} overflow={"hidden"}>
                          <Text
                            ml={3}
                            textAlign={"left"}
                            backgroundColor={"white"}
                            color={"black"}
                          >
                            {user.snippet.title}
                          </Text>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                )}
              </Collapse>
            </Box>
          )}
      
        </Text>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Navbar;
