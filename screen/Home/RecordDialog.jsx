import React , {useState, useEffect} from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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

const Kg = ({info}) => {
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

const Poop = ({info}) => {
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

const Vaccine = ({info}) => {
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
const Bath = ({info}) => {
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

const Walk = ({info}) => {
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
    margin : 10px;
    align-self : center;
    border: 1px solid #989898;
    border-radius : 10px;
    padding : 10px;
`;
const InputMemo = styled.TextInput`
  width : 100%;
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
    margin : 10px;
`;
const CompleText = styled.Text`
    font-size:20px;
    font-weight : bold;
    color : white;
`;
const RowView = styled.View`
    width : 100%;
    height : 40px;
    display : flex;
    flex-direction : row;
    align-items : center;
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