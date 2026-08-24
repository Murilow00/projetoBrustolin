import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
      <Tabs
          screenOptions={{
              headerShadowVisible: false,
              tabBarActiveTintColor: '#8f0505',
              tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: '600',
              },
          }}>
          <Tabs.Screen
              name="index"
              options={{
                  title: 'Murilo',
                  headerTitle: 'Projeto Base',
              }}
          />
          <Tabs.Screen
              name="amores"
              options={{
                  title: 'Amores',
                  headerTitle: 'Amores',
              }}
          />
          <Tabs.Screen
              name="resumo"
              options={{
                  title: 'Resumo',
                  headerTitle: 'Resumo',
              }}
          />
          <Tabs.Screen
              name="sobre"
              options={{
                  title: 'Sobre',
                  headerTitle: 'Sobre',
              }}
          />
          <Tabs.Screen
              name="Api"
              options={{
                  title: 'Api',
                  headerTitle: 'Api',
              }}
          />
          <Tabs.Screen
              name="Post"
              options={{
                  title: 'Post',
                  headerTitle: 'Post',
              }}
          />
          
      </Tabs>
      
  );
}
