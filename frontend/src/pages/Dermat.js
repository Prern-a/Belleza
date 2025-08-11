import { useEffect, useState, useMemo } from "react";
import {
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useParams } from "react-router-dom";

export default function Dermat() {
  const user_id = "csb-user";
  const user = useMemo(() => ({ id: user_id }), [user_id]);
  const { callId } = useParams();

  const apiKey = "mmhfdzb5evj2";
  const tokenProvider = async () => {
    const response = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: user_id,
        })
    );

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const { token } = await response.json();
    return token;
  };

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });

    myClient.connectUser(user).catch((err) => {
      console.error("Failed to connect user", err);
    });

    setClient(myClient);

    // Handle WebSocket errors
    myClient.on("connection.recovered", () => {
      console.log("Connection recovered");
    });

    myClient.on("connection.error", (error) => {
      console.error("Connection error", error);
    });

    myClient.on("connection.closed", () => {
      console.error("Connection closed");
    });

    return () => {
      if (myClient) {
        myClient.disconnectUser();
      }
      setClient(null);
    };
  }, [user]);

  useEffect(() => {
    if (!client || !callId) return;

    const myCall = client.call("default", callId);
    myCall.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });

    setCall(myCall);

    return () => {
      if (myCall) {
        myCall.leave().catch((err) => {
          console.error(`Failed to leave the call`, err);
        });
      }
      setCall(null);
    };
  }, [client, callId]);

  if (!client || !call) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme className="my-theme-overrides">
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
