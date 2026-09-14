import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
      <Tabs
          screenOptions={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#0b1020' },
              headerTintColor: '#f8fafc',
              tabBarActiveTintColor: '#8b5cf6',
              tabBarInactiveTintColor: '#94a3b8',
              tabBarStyle: {
                  backgroundColor: '#0f172a',
                  borderTopColor: '#1e293b',
                  borderTopWidth: 1,
              },
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

          <Tabs.Screen
              name="Delete"
              options={{
                  title: 'Delete',
                  headerTitle: 'Delete',
              }}
          />
          <Tabs.Screen
              name="sobre"
              options={{
                  title: 'Sobre',
                  headerTitle: 'Sobre',
              }}
          />
          
      </Tabs>
      
  );
}
