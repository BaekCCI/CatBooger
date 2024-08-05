import React , {useState, useEffect, useContext} from 'react';
import { View, Keyboard,Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useNavigationContainerRef, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../../UseContext';

export default function RecordDialog(){
    const navigation = useNavigation();
    const route = useRoute();
    const { info } = route.params;

    const [key, setKey] = useState(0);
        const handleReset = () => {
            setKey(prevKey => prevKey + 1);
        };
    const renderComponent = () =>{
        switch(info){
            case '급여':
                return <Feed info={info} key={key}/>;
            case '약':
                return <Medicine info={info} key={key}/>;    
            case '체중':
                return <Kg info={info} key={key}/>;
            case '대소변':
                return <Poop info={info} key={key}/>;  
            case '예방접종':
                return <Vaccine info={info} key={key}/>;
            case '목욕':
                return <Bath info={info} key={key}/>;  
        }
    }
    return (
        <StyledView>
            <TitleWrap>
                <Title>{info}</Title>
                <ReLoadBtn onPress={handleReset}>
                    <ReLoadImg source={require('../../assets/Home/reLoadIcon.png')}/>
                </ReLoadBtn>
            </TitleWrap>
            <Line/>
            {renderComponent()}
        </StyledView>
      );

}

const Uip = '10.55.1.188'

//급여
const Feed = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);


    //완료 버튼 동작 (text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add_medication_event`, {
            userId: String(userId), // 실제 사용자 ID로 대체
            feedingId: 'generated_id', // 실제 예방접종 ID로 대체
            date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 변환
            memo: text,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('급여 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('급여 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding feeding event:', error.response ? error.response.data : error.message);
          alert('급여 정보를 추가하는 과정에서 문제가 발생했습니다.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="예)오전 7시 사료 200g 급여"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>
            </CompleteBtn>
        </View>
        </TouchableWithoutFeedback>
      );
}

//약
const Medicine = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    //완료 버튼 동작 (text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add_medication_event`, {
            userId: String(userId), // 실제 사용자 ID로 대체
            medicationId: 'generated_id', // 실제 예방접종 ID로 대체
            date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 변환
            memo: text,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('약 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('약 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding medication event:', error.response ? error.response.data : error.message);
          alert('약 정보를 추가하는 과정에서 문제가 발생했습니다.');
        }
    };
    

    return(
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="예)처방약(오전)"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>

    );
}
//무게
const Kg = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [kg, setKg]=useState(0);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '' || (kg !== 0 && kg !==''));
    }, [text, kg]);

    //완료 버튼 동작 (kg, text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add_weight_event`, {
            userId: String(userId), // 실제 사용자 ID로 대체
            weightKgId: 'generated_id', // 실제 예방접종 ID로 대체
            date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 변환
            memo: text,
            weightKg: kg,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('체중 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('체중 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding weight event:', error.response ? error.response.data : error.message);
          alert('체중 정보를 추가하는 과정에서 문제가 발생했습니다.');
        }
    };


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <RowView>
                <TypeText>무게</TypeText>
                <InputKg
                    value={kg}
                    onChangeText={setKg}
                    placeholder="0.0"
                    placeholderTextColor="#d9d9d9"
                    keyboardType="numeric" 
                /> 
                <Component>Kg</Component>
            </RowView>
            <Line/>
            
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="예)점점 살이 빠지는 것 같음"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}

const Poop = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [poopBtn, setPoopBtn] = useState(false);
    const [peeBtn, setPeeBtn] = useState(false);
    const [poopColor, setPoopColor]=useState('none');
    const [poopStatus, setPoopStatus] = useState('none');
    const [peeColor, setPeeColor] = useState('none');
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);


    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '' || poopBtn || peeBtn);
    }, [text, poopBtn, peeBtn]);

    const handlePoopBtn=()=>{
        setPoopBtn(!poopBtn);
    }
    const handlePeeBtn=()=>{
        setPeeBtn(!peeBtn);
    }
    
    const handlePoopColor=(color)=>{
        setPoopColor(color);
    }
    const handlePoopStatus=(status)=>{
        setPoopStatus(status);
    }
    const handlePeeColor=(color)=>{
        setPeeColor(color);
    }

    //완료 버튼 동작 ( poopColor, poopStatus, peeColor, text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add_defecation_event`, {
            userId: String(userId), 
            defecationId: 'generated_id', 
            date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 변환
            color: poopBtn ? poopColor : null,
            type: poopBtn ? poopStatus : null,
            colorP: peeBtn ? peeColor : null,
            memo: text,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('대소변 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('대소변 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding defection event:', error.response ? error.response.data : error.message);
          alert(`대소변 정보를 추가하는 과정에서 문제가 발생했습니다.`);
        }
    };


    return(
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            {!poopBtn ? (
                <TextBtn onPress={handlePoopBtn}>
                    <TypeText size = '18px' weight = 'semi-bold' color='#139989'>대변 추가 +</TypeText>
                </TextBtn>

            ):(
                <View>
                    <TypeText>대변 색</TypeText>
                    <RowView>
                        <ColorBtn selected={poopColor === 'none'} onPress={() => handlePoopColor('none')}>
                            <XLine/>
                        </ColorBtn>
                        <ColorBtn color="brown" selected={poopColor === 'brown'} onPress={() => handlePoopColor('brown')}></ColorBtn>
                        <ColorBtn color="#FFC700" selected={poopColor === 'yellow'} onPress={() => handlePoopColor('yellow')}></ColorBtn>
                        <ColorBtn color="black" selected={poopColor === 'black'} onPress={() => handlePoopColor('black')}></ColorBtn>
                        <ColorBtn color="green" selected={poopColor === 'green'} onPress={() => handlePoopColor('green')}></ColorBtn>
                        <ColorBtn color="red" selected={poopColor === 'red'} onPress={() => handlePoopColor('red')}></ColorBtn>
                        <ColorBtn color="gray" selected={poopColor === 'gray'} onPress={() => handlePoopColor('gray')}></ColorBtn>
                    </RowView>
                     <TypeText>대변 상태</TypeText>
                     <RowView>
                         <StatusBtnWrap>
                            <StatusBtn selected={poopStatus === 'none'} onPress={() => handlePoopStatus('none')}>
                                <XLine/>
                            </StatusBtn>
                            <StatusText></StatusText>
                        </StatusBtnWrap>
                        <StatusBtnWrap>
                            <StatusBtn selected={poopStatus === '원통형'} onPress={() => handlePoopStatus('원통형')}>
                                <StatusImg source={require('../../assets/Home/Poop1.png')}/>
                            </StatusBtn>
                            <StatusText>원통형</StatusText>
                        </StatusBtnWrap>
                        <StatusBtnWrap>
                            <StatusBtn selected={poopStatus === '토끼똥'} onPress={() => handlePoopStatus('토끼똥')}>
                                <StatusImg source={require('../../assets/Home/Poop2.png')}/>
                            </StatusBtn>
                            <StatusText>토끼똥</StatusText>
                        </StatusBtnWrap>
                        <StatusBtnWrap>
                            <StatusBtn selected={poopStatus === '무른똥'} onPress={() => handlePoopStatus('무른똥')}>
                                <StatusImg source={require('../../assets/Home/Poop3.png')}/>
                            </StatusBtn>
                            <StatusText>무른똥</StatusText>
                        </StatusBtnWrap>
                        <StatusBtnWrap>
                            <StatusBtn selected={poopStatus === '점액질'} onPress={() => handlePoopStatus('점액질')}>
                                <StatusImg source={require('../../assets/Home/Poop4.png')}/>
                            </StatusBtn>
                            <StatusText>점액질</StatusText>
                        </StatusBtnWrap>
                    </RowView>
                </View>
            )}
            <Line/>
            {!peeBtn ? (
                <TextBtn onPress={handlePeeBtn}>
                    <TypeText size = '18px' weight = 'semi-bold' color='#139989'>소변 추가 +</TypeText>
                </TextBtn>

            ):(
                <View>

                <TypeText>소변 색</TypeText>
                <RowView>
                    <ColorBtn selected={peeColor === 'none'} onPress={() => handlePeeColor('none')}>
                        <XLine/>
                    </ColorBtn>
                    <ColorBtn color="yellow" selected={peeColor === 'lightYellow'} onPress={() => handlePeeColor('lightYellow')}></ColorBtn>
                    <ColorBtn color="#FFCA0F" selected={peeColor === 'yellow'} onPress={() => handlePeeColor('yellow')}></ColorBtn>
                    <ColorBtn color="#FF9900" selected={peeColor === 'orange'} onPress={() => handlePeeColor('orange')}></ColorBtn>
                    <ColorBtn color="red" selected={peeColor === 'red'} onPress={() => handlePeeColor('red')}></ColorBtn>
                    <ColorBtn color="#FF9900" selected={peeColor === 'black'} onPress={() => handlePeeColor('black')}>
                        <ColorImg source={require('../../assets/Home/BrBkColor.png')}/>
                    </ColorBtn>
                    <ColorBtn color="white" selected={peeColor === 'white'} onPress={() => handlePeeColor('white')}>
                        <ColorImg source={require('../../assets/Home/WhiteColor.png')}/>
                    </ColorBtn>
                </RowView>
            </View>
            )}
            <Line/>
            <TypeText>메모</TypeText>
            <InputWrap>
                <InputMemo
                    value={text}
                    onChangeText={setText}
                    placeholder="예) 소변 양이 많음"
                    placeholderTextColor="#888"
                    multiline={true} /* 여러 줄 입력을 허용 */
                />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>
            </CompleteBtn>
        </View>
        </TouchableWithoutFeedback>
        </ScrollView>

    );
}

const Vaccine = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    //완료 버튼 동작 (text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add_vaccination_event`, {
            userId: String(userId), // 실제 사용자 ID로 대체
            vaccinationId: 'generated_id', // 실제 예방접종 ID로 대체
            date: new Date().toISOString().split('T')[0], // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
            memo: text,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('백신 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('백신 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding vaccination event:', error.response ? error.response.data : error.message);
          alert('백신 정보를 추가하는 과정에서 문제가 발생했습니다.');
        }
    };



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="예)관경병 예방접종"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}

const Bath = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    useEffect(() => {
        console.log('userId:', userId); // userId가 제대로 설정되었는지 확인
      }, [userId]);

    //완료 버튼 동작 (text 변수 저장해야함)
    const handleComplete = async () => {
        try {
          const response = await axios.post(`http://${Uip}:5001/add`, {
            userId: String(userId), // 실제 사용자 ID로 대체
            bathingId: 'generated_id', // 실제 목욕 ID로 대체
            date: new Date().toISOString(), // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
            memo: text,
          });
          console.log('Response:', response.data);
          if (response.status === 201) {
            alert('목욕 정보를 추가하였습니다!');
            setText(''); // 완료 후 입력 필드 초기화
            setIsModified(false); // 완료 후 버튼 비활성화
            navigation.navigate('Home'); // 홈 화면으로 이동
          } else {
            alert('목욕 정보 추가를 실패했습니다.');
          }
        } catch (error) {
            console.error('Error adding bathing event:', error.response ? error.response.data : error.message);
          alert('목욕 정보를 추가하는 과정에서 문제가 발생했습니다.');
        }
    };



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="예)양치함"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}

const StyledView = styled.View`
    width : 85%;
    height : 100%;
    display : flex;
    align-self : center;
`;

const Line = styled.View`
    background-color : #d0d0d0;
    width : 100%;
    height : 1px;
    align-self : center;
    margin : 10px 0 ;
`;
const TypeText = styled.Text`
    font-size : ${props => props.size || '15px'};
    font-weight : ${props => props.weight || 'regular'};
    color : ${props => props.color || 'black'};
    margin-right : 20px;
;`
const InputWrap = styled.View`
    width : 95%;
    height : 200px;
    margin : 20px 0;
    align-self : center;
    border: 1px solid #989898;
    border-radius : 10px;
    padding : 10px;
`;
const InputMemo = styled.TextInput`
  width : 100%;
  height : 100%;
  font-size: 15px;
  color: black;
`;
const CompleteBtn = styled.TouchableOpacity`
    width :150px;
    height : 40px;
    background-color: ${props => props.isModified ? '#139989' : '#d9d9d9'};
    align-self : center;
    border-radius : 10px;
    justify-content : center;
    align-items : center;
    margin-top : 10px;
    margin-bottom : 30px;
`;
const CompleText = styled.Text`
    font-size:20px;
    font-weight : bold;
    color : white;
`;
const RowView = styled.View`
    width : 100%;
    display : flex;
    flex-direction : row;
    align-items : center;
    margin : 5px 0 ;
`;
const Component = styled.Text`
    font-size : 20px;
    font-weight : bold;
    margin-right : 10px;
    text-align : center;
    color : ${props => props.color || 'black'};
`;
const CountBtn = styled.TouchableOpacity`
    width : 22px;
    height : 22px;
    margin : 5px;
    background-color : #139989;
    border-radius : 50px;
    justify-content : center;
    
`;
const BtnImg = styled.Image`
    width : 100%;
    height : 100%;
`;
const InputKg = styled.TextInput`
    font-weight : bold;
    font-size : 20px;
    align-items: center;
    margin-right : 10px;
`;

const ColorBtn = styled.TouchableOpacity`
    width :30px;
    height:30px;
    border : ${({ selected }) => (selected ? '3px solid #139989' : '1px solid #B3B3B3')};
    border-radius : 50px;
    margin : 10px 10px 10px 0;
    background-color : ${props=>props.color || "white"};
`;
const StatusBtnWrap = styled.View`
    width : 50px;
    margin-right : 15px;
`
const StatusBtn = styled.TouchableOpacity`
    width : 50px;
    height : 50px;
    border : ${({ selected }) => (selected ? '3px solid #139989' : '1px solid #B3B3B3')};
    border-radius : 50px;
    margin : 10px 10px 0 0;
    justify-content : center;
    align-items : center;
`;
const StatusImg = styled.Image`
    width :85%;
    height : 85%;
    resize-mode : cover;
`
const StatusText = styled.Text`
    text-align : center;
    font-size : 12px;
    margin : 5px 0;
`;
const ColorImg = styled.Image`
    width : 100%;
    height : 100%;
`;
const XLine = styled.View`
    width : 2px;
    height : 100%;
    background-color : red;
    transform: rotate(45deg);
    align-self : center;
`;
const TextBtn = styled.TouchableOpacity`
    margin : 5px 0;
    
`;
const TitleWrap = styled.View`
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-top : 15px;
`;
const Title=styled.Text`
    font-size : 25px;
    font-weight : bold;
`;
const ReLoadBtn = styled.TouchableOpacity`
    width : 22px;
    height : 22px;
    margin-left : auto;
    margin-right : 0;
`;
const ReLoadImg = styled.Image`
    width : 100%;
    height : 100%;
    
`;