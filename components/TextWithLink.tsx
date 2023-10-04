
import React from 'react';
import { Text } from 'react-native';

const HighlightLinks = (text) => {
    // Regular expression to match URLs in text
    const urlRegex = /(https?|ftp|www):\/\/[^\s/$.?#].[^\s]*/g;

    // Split the text into parts: link and non-link
    const parts = text.split(urlRegex);

    // Iterate through parts and apply styles to links
    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <Text
                    key={index}
                    style={{ color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => handleLinkPress(part)}
                >

                </Text>
            );
        }
        return part;
    });
};

const handleLinkPress = (link) => {
    // Handle the link press action here, e.g., open the link in a browser
    // You can use Linking from 'react-native' to open URLs
};

const TextWithLinks = ({ text }:{text:string}) => {
    return <Text></Text>;
};

export default TextWithLinks;
