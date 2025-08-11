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

export default function VideoCall() {
  const user_id = "csb-user";
  // Memoize the user object
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

  const [client, setClient] = useState();
  const [call, setCall] = useState();

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, [user]);

  useEffect(() => {
    if (!client) return;
    const myCall = client.call("default", callId);
    myCall.join().catch((err) => {
      console.error(`Failed to join the call`, err);
    });

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
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
