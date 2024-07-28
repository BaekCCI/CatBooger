import React , {useState, useEffect} from 'react';
import { View, Keyboard, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RecordDialog(){
    const navigation = useNavigation();
    const route = useRoute();
    const { info } = route.params;


    const renderComponent = () =>{
        switch(info){
            case '급여':
                return <Feed info={info}/>;
            case '약':
                return <Medicine info={info}/>;    
            case '체중':
                return <Kg info={info}/>;
            case '대소변':
                return <Poop info={info}/>;  
            case '예방접종':
                return <Vaccine info={info}/>;
            case '목욕':
                return <Bath info={info}/>;  
            case '산책':
            return <Walk info={info}/>;  
        }
    }

    return (
        <StyledView>
            <Title>{info}</Title>
            <Line/>
            {renderComponent()}
            

            
        </StyledView>
      );

}


//급여
const Feed = ({info}) => {
    const [bobCount, setBobCount] = useState(0);
    const [waterCount, setWaterCount] = useState(0);
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '' || bobCount !== 0 || waterCount !== 0);
    }, [text, bobCount, waterCount]);

    const handleCount=(type)=>{
        switch(type){
            case 'BobPlus':
                setBobCount(bobCount+1);
                break;
            case 'BobMinus':
                if (bobCount > 0) {
                    setBobCount(bobCount - 1);
                }
                break;
            case 'WaterPlus':
                setWaterCount(waterCount+1);
                break;
            case 'WaterMinus':
                if (waterCount > 0) {
                    setWaterCount(waterCount - 1);
                }
                break;
        }

    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <RowView>
                <TypeText>사료 추가</TypeText>
                <Component color={bobCount === 0 ? '#d9d9d9' : 'black'}>{bobCount}</Component>
                <Component>회</Component>
                <CountBtn onPress={()=>handleCount('BobPlus')}>
                    <BtnImg source={require('../../assets/Home/PlusBtn.png')}/>
                </CountBtn>
                <CountBtn onPress={()=>handleCount('BobMinus')}>
                    <BtnImg source={require('../../assets/Home/MinusBtn.png')}/>
                </CountBtn>
            </RowView>
            <RowView>
                <TypeText>물 추가</TypeText>
                <Component color={waterCount === 0 ? '#d9d9d9' : 'black'}>{waterCount}</Component>
                <Component>회</Component>
                <CountBtn onPress={()=>handleCount('WaterPlus')}>
                    <BtnImg source={require('../../assets/Home/PlusBtn.png')}/>
                </CountBtn>
                <CountBtn onPress={()=>handleCount('WaterMinus')}>
                    <BtnImg source={require('../../assets/Home/MinusBtn.png')}/>
                </CountBtn>
            </RowView>
            <Line/>

            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
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

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    return(
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
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

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '' || (kg !== 0 && kg !==''));
    }, [text, kg]);


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
                placeholder="내용을 입력하세요"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}

const Poop = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [poopColor, setPoopColor]=useState('none');
    const [poopStatus, setPoopStatus] = useState('none');
    const [peeColor, setPeeColor] = useState('none');


    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);
    
    const handlePoopColor=(color)=>{
        setPoopColor(color);
    }
    const handlePoopStatus=(status)=>{
        setPoopStatus(status);
    }
    const handlePeeColor=(color)=>{
        setPeeColor(color);
    }

    return(
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>대변 색</TypeText>
            <RowView>
                <ColorBtn selected={poopColor === 'none'} onPress={() => handlePoopColor('none')}></ColorBtn>
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
            <Line/>
            <TypeText>소변 색</TypeText>
            <RowView>
                <ColorBtn selected={peeColor === 'none'} onPress={() => handlePeeColor('none')}></ColorBtn>
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
            <Line/>
            
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
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

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#888"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}
const Bath = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#d9d9d9"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>

    );
}

const Walk = ({info}) => {
    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#d9d9d9"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
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
const Title=styled.Text`
    font-size : 25px;
    font-weight : bold;
    margin-top : 20px;
`;
const TypeText = styled.Text`
    font-size : 15px;
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
`