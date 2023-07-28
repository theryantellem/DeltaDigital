import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {useQuery} from "@tanstack/react-query";
import {quantitativeStrategies} from "../../api";
import {useAppSelector} from "../../app/hooks";

const Quantitative = () => {
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
  const {data,isLoading} =  useQuery(['quantitativeStrategies',User_Details.id],()=>quantitativeStrategies(User_Details.id))
    return (
        <Text>

        </Text>
    );
};

const styles = StyleSheet.create({})

export default Quantitative;
