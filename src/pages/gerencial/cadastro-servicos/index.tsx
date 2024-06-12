import React, { useState, useEffect } from "react";
import { View, ScrollView, Modal, ActivityIndicator, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { useNavigation } from "@react-navigation/native";
import ButtonStyled from "../../../components/ButtonStyled";
import ServiceRegistrationCard from "../../../components/ServiceRegistrationCard";
import ServiceRegistrationModal from "../../../components/Modals/ServiceRegistrationModal";
import api from "../../../services/api";
import { stylesModal } from "../../login";
import Header from "../../../components/Header";
import { RegisterServiceProps } from "../../../types/services";

const CadastroServicos = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);
  const [search, setSearch] = useState(true);
  const [data, setData] = useState<RegisterServiceProps[]>([]);

  const handleReturn = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (search) {
      api
        .get("/servicos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            setData(response.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSearch(false);
        });
    }
  }, [search]);

  const [visibleModal, setVisibleModal] = useState(false);

  const handleServiceAdded = () => {
    setSearch(true);
  };

  const handleServiceDeleted = () => {
    setSearch(true);
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
      <Header
        title="Cadastro de Serviços"
        subtitle="Gerêncie os serviços prestados pela barbearia"
        onNavegatePage={handleReturn}
      />
      <ScrollView style={{ height: "80%" }}>
        {data &&
          data.map((value, index) => (
            <ServiceRegistrationCard key={index} service={value} onServiceDeleted={handleServiceDeleted} />
          ))}
      </ScrollView>
      <ButtonStyled
        name="Adicionar"
        onPress={() => setVisibleModal(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <ServiceRegistrationModal
          handleClose={() => setVisibleModal(false)}
          onServiceAdded={handleServiceAdded}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="none"
        visible={search}
        onRequestClose={() => {}}
      >
        <View style={stylesModal.modalBackground}>
          <View style={stylesModal.activityIndicatorWrapper}>
            <ActivityIndicator animating={search} size={50} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CadastroServicos;