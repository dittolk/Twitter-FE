import { Box, Button, Center, Flex, Image, Input, Square, Text, Textarea, useColorModeValue, Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Timeline() {
    const [tweets, setTweets] = useState([])
    const tweetRef = useRef();
    const user = useSelector((state) => state.user.value);

    const loadTweets = async () =>{
        try{
            const response = await axios.get("http://localhost:2000/tweets");
            console.log("Response data", response.data);
            setTweets(response.data);
        }catch(err){
            console.log(err);
        }
    };

    const handlePostTweets = async () => {
        try{
            const response = await axios.post("http://localhost:2000/tweets", {name: user.name, username: user.username, tweet: tweetRef.current.value});
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadTweets();
      }, [])

      console.log("Ref tweet", tweets);


    return(
        <>
        <Flex flexDirection={'column'}>
            <Flex flexDirection={'row'} p={4}>
                <Input ref={tweetRef} w={'80%'} bg={'gray.100'} placeholder="Post tweet" marginBottom={'2rem'} marginRight={'2rem'}></Input>
                <Button
                onClick={handlePostTweets}
                flex={1}
                fontSize={'sm'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                bg: 'blue.500',
                }}
                _focus={{
                bg: 'blue.500',
                }}>
                Tweet
                 </Button>
            </Flex>
            <Flex flexDirection={'column-reverse'}>
                {tweets.map((item, index) =>(
                    <Box border={'1px solid grey'} p={6} w={'100vh'}>
                        <Avatar name={item.name}/>
                        <Text>
                            <strong>{item.name} @{item.username}</strong><br/>
                            {item.tweet}<br/>
                            <br/>
                        </Text>
                    </Box>
                ))}
            </Flex>
        </Flex>
            
        </>
    )
}

export default Timeline;