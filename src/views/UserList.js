import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { ListItem, Avatar, Button, Icon } from "react-native-elements";

import users from "../data/users";

export default (props) => {
  const confirmUserDeletion = (user) => {
    Alert.alert("Excluir usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          console.warn("Delete " + user.id);
        },
      },
      { text: "Não" },
    ]);
  };
  const getActions = (user) => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  };
  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => {
          props.navigation.navigate("UserForm", user);
        }}
      >
        <Avatar rounded size="medium" source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 20 }}>{user.name}</ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 15 }}>
            {user.email}
          </ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  };
  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  );
};
