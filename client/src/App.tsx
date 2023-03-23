import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  DashboardOutlined,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";
import { CssBaseline, GlobalStyles } from "@mui/material";

import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import {
  Agents,
  AllProperties,
  CreateProperty,
  EditProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
} from "pages";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Layout } from "./components/layout";
import { ColorModeContextProvider } from "./contexts/color-mode";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // Save user to MongoDb upon login
      if (profileObj) {
        try {
          const res = await fetch(process.env.REACT_APP_USER_API_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          });
          const data = await res.json();

          // Save user information to localStorage
          if (res.ok) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid: data._id,
              })
            );
          } else {
            return Promise.reject();
          }
          localStorage.setItem("token", `${credential}`);
          return {
            success: true,
            redirectTo: "/",
          };
        } catch (error) {
          console.log(error);
        }
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error("Not authenticated"),
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(process.env.REACT_APP_API_URL!)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  options: {
                    label: "Dashboard",
                  },
                  icon: <DashboardOutlined></DashboardOutlined>,
                },
                {
                  name: "properties",
                  list: "properties",
                  show: PropertyDetails,
                  create: "properties/create",
                  edit: EditProperty,
                  icon: <VillaOutlined></VillaOutlined>,
                },
                {
                  name: "agents",
                  list: "agents",
                  icon: <PeopleAltOutlined></PeopleAltOutlined>,
                },
                {
                  name: "reviews",
                  list: "reviews",
                  icon: <StarOutlineRounded></StarOutlineRounded>,
                },
                {
                  name: "messages",
                  list: "messages",
                  icon: <ChatBubbleOutline></ChatBubbleOutline>,
                },
                {
                  name: "my-profile",
                  options: {
                    label: "My Profile",
                  },
                  list: "my-profile",
                  icon: <AccountCircleOutlined></AccountCircleOutlined>,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home></Home>}></Route>
                  <Route path="/properties">
                    <Route
                      index
                      element={<AllProperties></AllProperties>}
                    ></Route>
                    <Route
                      path="create"
                      element={<CreateProperty></CreateProperty>}
                    ></Route>
                  </Route>
                  <Route path="/agents">
                    <Route index element={<Agents></Agents>}></Route>
                  </Route>
                  <Route path="/reviews">
                    <Route index element={<Home></Home>}></Route>
                  </Route>
                  <Route path="/messages">
                    <Route index element={<Home></Home>}></Route>
                  </Route>
                  <Route path="/my-profile">
                    <Route index element={<MyProfile></MyProfile>}></Route>
                  </Route>
                  {/* <Route
                    index
                    element={<NavigateToResource resource="products" />}
                  />
                  <Route path="/products">
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                    <Route path="show/:id" element={<ProductShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route> */}
                </Route>

                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                    <Authenticated>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
