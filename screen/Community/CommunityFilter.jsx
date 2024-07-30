/**커뮤니티에서 필터 창에 해당하는 파일*/
import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, View} from "react-native";
import styled from "styled-components";
import { Colors } from "react-native/Libraries/NewAppScreen";

[isFilterOpened, isFilterOpenedSet] = useState(false);
