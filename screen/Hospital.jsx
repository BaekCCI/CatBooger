import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Image, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import WebView from 'react-native-webview';
import { JAVASCRIPT_KEY } from '@env';

const hospitals = [
  {
    name: '도그스데이',
    phonenumber: '--',
    openingHours: '--', 
    status: '진료중',
    address: '서울 서초구 양재동 317-1',
    image: 'https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FB0BAB98B9FF444F98C587E3CA261C534', // 실제 이미지 URL로 대체하세요
    latitude: 37.4701939796152,
    longitude: 127.039963562513,
  },
  {
    name: '이리온 양재점',
    phonenumber: '02-577-6125',
    openingHours: '매일 10:00 - 09:00', 
    status: '진료 종료',
    address: '서울 서초구 양재동 215',
    image: 'https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F17462C3A4FD167B90D', // 실제 이미지 URL로 대체하세요
    latitude: 37.78825,
    longitude: 127.037012006184,
  },
  {
    name: '한동물병원',
    phonenumber: '02-577-3690',
    openingHours: '월~금 10:00 ~ 19:00', 
    status: '진료 종료',
    address: '서울 서초구 양재동 377-4',
    image: 'https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=https%3A%2F%2Fblogfiles.pstatic.net%2FMjAyMzA1MTBfNDYg%2FMDAxNjgzNjgzMTYzODk4.VMhmYSaYgd0XhgNjjcZ-AtZ2IV2QNYZNegwD17fsS6Qg.Lf2nKb6_eWFZ3nP6PB3-QiDuRHho1YjYXiaJsDoMkMgg.JPEG.hanspet3690%2F%25EB%25B8%2594%25EB%25A1%259C%25EA%25B7%25B8%25EB%25B0%25B0%25EB%2584%2588.jpg', // 실제 이미지 URL로 대체하세요
    latitude: 37.47187487982,
    longitude: 127.045978569832,
  },
  {
    name: '사랑의동물병원',
    phonenumber: '02-577-7475',
    openingHours: '월~토 9:00 ~ 20:00 / 화요일 9:00 ~ 18:00', 
    status: '진료 종료',
    address: '서울 서초구 양재동 257-2',
    image: 'https://via.placeholder.com/75', // 실제 이미지 URL로 대체하세요
    latitude: 37.4748316142529,
    longitude: 127.042168278465,
  },
  {
    name: '개포별빛동물병원',
    phonenumber: '02-573-7582',
    openingHours: '평일 10:00 - 21:00 / 공휴일 10:00 - 18:00', 
    status: '진료 종료',
    address: '서울 강남구 개포동 1229-11',
    image: 'https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMzExMTBfMTM0%2FMDAxNjk5NTk4ODY3MTI2.m4Y94sruIf8NUsmiKlyDTDHEPsuHKkEHY0T7HbJ405Yg.NoMXeBCgC3fTFKfuBqNEmgPvPAEys-GyQv2Aoi_bw3sg.JPEG.winter82%2FKakaoTalk_20231110_154510256.jpg%3Ftype%3Dw773', // 실제 이미지 URL로 대체하세요
    latitude: 37.4764482765639,
    longitude: 127.046311489534,
  },
  {
    name: '레스펫 동물병원',
    phonenumber: '02-575-0855',
    openingHours: '월~금 10:00 ~ 19:00', 
    status: '진료 종료',
    address: '서울 서초구 양재동 2-43',
    image: 'https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Fmystore%2F112EF43FBE0E4344951144059831A901', // 실제 이미지 URL로 대체하세요
    latitude: 37.4849304420611,
    longitude: 127.041269418606,
  },
  {
    name: '에이블동물병원',
    phonenumber: '02-2058-1882',
    openingHours: '월~금 10:00 ~ 21:00', 
    status: '진료 종료',
    address: '서울 서초구 양재동 4-14',
    image: 'https://via.placeholder.com/75', // 실제 이미지 URL로 대체하세요
    latitude: 37.48091901094467,
    longitude: 127.04166970892175,
  },
];

const mapUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer,drawing`;

const htmlContent = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Kakao 지도</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
        }

        .map_wrap,
        .map_wrap * {
            margin: 0;
            padding: 0;
            font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
            font-size: 12px;
        }

        .map_wrap a,
        .map_wrap a:hover,
        .map_wrap a:active {
            color: #000;
            text-decoration: none;
        }

        .map_wrap {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        // #menu_wrap {
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     bottom: 0;
        //     width: 30%;
        //     height: 90%;
        //     margin: 10px 0 30px 10px;
        //     padding: 5px;
        //     overflow-y: auto;
        //     background: rgba(255, 255, 255, 0.7);
        //     z-index: 1;
        //     font-size: 12px;
        //     border-radius: 10px;
        // }

        // .bg_white {
        //     background: #fff;
        // }

        // #menu_wrap hr {
        //     display: block;
        //     height: 1px;
        //     border: 0;
        //     border-top: 2px solid #5F5F5F;
        //     margin: 3px 0;
        // }

        // #menu_wrap .option {
        //     text-align: center;
        // }

        // #menu_wrap .option p {
        //     margin: 10px 0;
        // }

        // #menu_wrap .option button {
        //     margin-left: 5px;
        // }

        // #placesList li {
        //     padding: 0;
        //     margin: 0;
        //     list-style: none;
        // }

        // #placesList .item {
        //     position: relative;
        //     border-bottom: 1px solid #888;
        //     overflow: hidden;
        //     cursor: pointer;
        //     box-sizing: border-box; /* 패딩과 테두리를 요소의 전체 크기에 포함 */
        // }

        // #placesList .item span {
        //     display: block;
        // }

        // #placesList .item h5,
        // #placesList .item .info {
        //     text-overflow: ellipsis;
        //     overflow: hidden;
        //     white-space: nowrap;
        // }

        // #placesList .item .info {
        //     padding: 10px 0 10px 55px;
        // }

        // #placesList .info .gray {
        //     color: #8a8a8a;
        // }

        // #placesList .info .jibun {
        //     padding-left: 26px;
        //     background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
        // }

        // #placesList .info .tel {
        //     color: #009900;
        // }

        // #placesList .item .markerbg {
        //     float: left;
        //     position: absolute;
        //     width: 30%;
        //     height: 40%;
        //     margin: 10px 0 0 10px;
        //     background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
        // }

        // #placesList .item .marker_1 {
        //     background-position: 0 -10px;
        // }

        // #placesList .item .marker_2 {
        //     background-position: 0 -56px;
        // }

        // #placesList .item .marker_3 {
        //     background-position: 0 -102px
        // }

        // #placesList .item .marker_4 {
        //     background-position: 0 -148px;
        // }

        // #placesList .item .marker_5 {
        //     background-position: 0 -194px;
        // }

        // #placesList .item .marker_6 {
        //     background-position: 0 -240px;
        // }

        // #placesList .item .marker_7 {
        //     background-position: 0 -286px;
        // }

        // #placesList .item .marker_8 {
        //     background-position: 0 -332px;
        // }

        // #placesList .item .marker_9 {
        //     background-position: 0 -378px;
        // }

        // #placesList .item .marker_10 {
        //     background-position: 0 -423px;
        // }

        // #placesList .item .marker_11 {
        //     background-position: 0 -470px;
        // }

        // #placesList .item .marker_12 {
        //     background-position: 0 -516px;
        // }

        // #placesList .item .marker_13 {
        //     background-position: 0 -562px;
        // }

        // #placesList .item .marker_14 {
        //     background-position: 0 -608px;
        // }

        // #placesList .item .marker_15 {
        //     background-position: 0 -654px;
        // }

        // #pagination {
        //     margin: 10px auto;
        //     text-align: center;
        // }

        // #pagination a {
        //     display: inline-block;
        //     margin-right: 10px;
        // }

        // #pagination .on {
        //     font-weight: bold;
        //     cursor: default;
        //     color: #777;
        // }
    </style>
</head>

<body>
    <div class="map_wrap">
        <div id="map" style="width:100%;height:100%;position:absolute;overflow:hidden;"></div>

        <div id="menu_wrap" class="bg_white">
            <div class="option">
                <div>
                    <form id="searchForm">
                        키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15">
                        <button type="button" id="searchButton">검색하기</button>                    
                    </form>
                </div>
            </div>
            <hr>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div>
    </div>
    <script type="text/javascript"
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${JAVASCRIPT_KEY}&libraries=services,clusterer,drawing"></script>
    <script>
        // 마커를 담을 배열입니다
        var markers = [];

        var place = [{
                "address_name": "서울 서초구 양재동 317-1",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "286559786",
                "phone": "",
                "place_name": "도그스데이",
                "place_url": "http://place.map.kakao.com/286559786",
                "road_address_name": "서울 서초구 강남대로12길 23-13",
                "x": "127.039963562513",
                "y": "37.4701939796152"
            }, 
            {
                "address_name": "서울 서초구 양재동 215",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "17653944",
                "phone": "02-577-6125",
                "place_name": "이리온 양재점",
                "place_url": "http://place.map.kakao.com/17653944",
                "road_address_name": "서울 서초구 매헌로 16",
                "x": "127.037012006184",
                "y": "37.4633977128333"
            }, 
            {
                "address_name": "서울 서초구 양재동 377-4",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "10950807",
                "phone": "02-577-3690",
                "place_name": "한동물병원",
                "place_url": "http://place.map.kakao.com/10950807",
                "road_address_name": "서울 서초구 동산로 66",
                "x": "127.045978569832",
                "y": "37.47187487982"
            }, 
            {
                "address_name": "서울 서초구 양재동 257-2",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "11053126",
                "phone": "02-577-7475",
                "place_name": "사랑의동물병원",
                "place_url": "http://place.map.kakao.com/11053126",
                "road_address_name": "서울 서초구 마방로6길 18",
                "x": "127.042168278465",
                "y": "37.4748316142529"
            }, 
            {
                "address_name": "서울 강남구 개포동 1229-11",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "19071907",
                "phone": "02-573-7582",
                "place_name": "개포별빛동물병원",
                "place_url": "http://place.map.kakao.com/19071907",
                "road_address_name": "서울 강남구 논현로 70",
                "x": "127.046311489534",
                "y": "37.4764482765639"
            }, 
            {
                "address_name": "서울 서초구 양재동 2-43",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "8348151",
                "phone": "02-575-0855",
                "place_name": "레스펫 동물병원",
                "place_url": "http://place.map.kakao.com/8348151",
                "road_address_name": "서울 서초구 논현로 173",
                "x": "127.041269418606",
                "y": "37.4849304420611"
            }, 
            {
                "address_name": "서울 서초구 양재동 4-14",
                "category_group_code": "HP8",
                "category_group_name": "병원",
                "category_name": "가정,생활 > 반려동물 > 동물병원",
                "distance": "",
                "id": "19476837",
                "phone": "02-2058-1882",
                "place_name": "에이블동물병원",
                "place_url": "http://place.map.kakao.com/19476837",
                "road_address_name": "서울 서초구 바우뫼로 211",
                "x": "127.04166970892175",
                "y": "37.48091901094467"
            }
        ]


        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(37.4682948811902, 127.0392707354992), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        // 키워드로 장소를 검색합니다
        // searchPlaces();

        displayPlaces(place);
 

        document.getElementById('searchButton').addEventListener('click', function() {
            var keyword = document.getElementById('keyword').value;
            // window.ReactNativeWebView.postMessage(JSON.stringify({keyword}));
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return;
            }
            searchPlaces(keyword);
        });


        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces(keyword) {

            // var keyword = document.getElementById('keyword').value;

            // if (!keyword.replace(/^\s+|\s+$/g, '')) {
            //     alert('키워드를 입력해주세요!');
            //     return false;
            // }

            window.ReactNativeWebView.postMessage(keyword);
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB);
            window.ReactNativeWebView.postMessage("search...");
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            window.ReactNativeWebView.postMessage(data);
            window.ReactNativeWebView.postMessage(status);
            window.ReactNativeWebView.postMessage(pagination);
            if (status === kakao.maps.services.Status.OK) {

                logToReactNativeConsole(JSON.stringify(data));

                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(places);

                // // 페이지 번호를 표출합니다
                // displayPagination(pagination);

                window.ReactNativeWebView.postMessage(JSON.stringify(data));

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                logToReactNativeConsole('Error: ' + status);

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {

            var listEl = document.getElementById('placesList'),
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            // // 검색 결과 목록에 추가된 항목들을 제거합니다
            // removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (var i = 0; i < places.length; i++) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // // 마커와 검색결과 항목에 mouseover 했을때
                // // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // // mouseout 했을 때는 인포윈도우를 닫습니다
                // (function (marker, title) {
                //     kakao.maps.event.addListener(marker, 'mouseover', function () {
                //         displayInfowindow(marker, title);
                //     });

                //     kakao.maps.event.addListener(marker, 'mouseout', function () {
                //         infowindow.close();
                //     });

                //     itemEl.onmouseover = function () {
                //         displayInfowindow(marker, title);
                //     };

                //     itemEl.onmouseout = function () {
                //         infowindow.close();
                //     };
                // })(marker, places[i].place_name);

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {

            var el = document.createElement('li'),
                itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' + places.address_name + '</span>';
            } else {
                itemStr += '    <span>' + places.address_name + '</span>';
            }

            itemStr += '  <span class="tel">' + places.phone + '</span>' +
                '</div>';

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://cdn-icons-png.flaticon.com/512/5860/5860579.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(108, 111),  // 마커 이미지의 크기
                imgOptions = {

                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }
    </script>
</body>

</html>     
`;

const Hospital = ({ navigation }) => {
  const [showMap, setShowMap] = useState(false);

  const webViewRef = React.useRef(null);
  const onMessage = (event) => {
    const searchData = event.nativeEvent.data;
    console.log('Received message from WebView:', searchData);
  }  

  const onPress = (item) => {
    navigation.navigate('HospitalDetail', {hospital: item});
}
  const toggleView = () => setShowMap(!showMap);

  const renderHospitalItem = ({ item }) => (
    <HospitalCard key={item.name} onPress={() => onPress(item)}>
      <HospitalImage source={{ uri: item.image }} />
      <HospitalInfo>
        <HospitalName>{item.name}</HospitalName>
        <HospitalStatus>{item.status}</HospitalStatus>
        <HospitalAddress>{item.address}</HospitalAddress>
      </HospitalInfo>
    </HospitalCard>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          {/* <SearchInput placeholder="병원을 검색하세요" /> */}
          <Title>근처 동물병원</Title>
          <MapButton onPress={toggleView}>
            <Icon name={showMap ? "list-outline" : "map-outline"} size={27} color="#000" />
          </MapButton>
        </Header>
        {showMap ? (
            <View style={styles.webViewContainer}>
                <WebView
                ref={webViewRef}
                source={{ html: htmlContent }}
                originWhitelist={['*']}
                mixedContentMode='always'
                style={styles.webView}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                onMessage={onMessage}
                onLoadEnd={() => console.log('WebView loaded')}
                onError={(event) => console.error('WebView error', event.nativeEvent)}
                onLoadStart={() => console.log('WebView loading')}
                />
            </View>
        ) : (
          <>
            {/* <Title>근처 동물병원</Title> */}
            <FlatList
              data={hospitals}
              renderItem={renderHospitalItem}
              keyExtractor={item => item.name}
            />
          </>
        )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    webViewContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1, 
        borderColor: '#777', // 원하는 border 색상을 설정합니다
      },
  webView: {
    flex: 1, // WebView가 전체 공간을 차지하도록 설정
    width: '100%',
  },
});

const Container = styled.View`
  flex: 1;
  padding: 3%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  align-items: center;
  margin: 0 3%;
  padding: 2%;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const MapButton = styled.TouchableOpacity`
  align-items: center;
  margin: 0 3%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 6%;
  margin-left: 3%;
  margin-right: 3%;
`;

const HospitalCard = styled.TouchableOpacity`
  flex-direction: row;
  padding: 7% 5%;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 3%;
`;

const HospitalImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 4px;
`;

const HospitalInfo = styled.View`
  margin-left: 6%;
  flex: 1;
`;

const HospitalName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const HospitalStatus = styled.Text`
  color: #777;
`;

const HospitalAddress = styled.Text`
  color: #777;
`;

export default Hospital;
