import { View, Image,StyleSheet, ImageBackground,ActivityIndicator,FlatList,useWindowDimensions,StatusBar} from 'react-native'
import React ,{useEffect, useState,useContext} from 'react'
import { Text, TextInput, Button,IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SERVER_IP, SERVER_PORT } from '../../../config';
import { authContext, themeContext } from '../../context';
import { globalStyles } from '../../global';
import TextAnimator from '../../components/TextAnimator'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
const HomeScreen = () => {
  Categories=[
    {key:"0",value:"All"},
    {key:"1",value:"General"},
    {key:"2",value:"Cardiovascular"},
    {key:"3",value:"Neurology"},
    {key:"4",value:"Dermatology"},
    {key:"5",value:"Orthodontics"},
    {key:"6",value:"Nephrology"},
    {key:"7",value:"Mental Health"},
    {key:"8",value:"Ophthalmology"},
    {key:"9",value:"Gynecology"},
    {key:"10",value:"ENT"}]

  // let lastpostId=0;
  const { setTheme} = useContext(themeContext);
  const { auth } = useContext(authContext);
  const { height,width } = useWindowDimensions();
  const [searchInput,setSearchInput] = useState('');
  const [feed,setFeed] =useState([]);
  const [filterdata,setfilterdata]=useState([]);
  const [selected,setSelected] = React.useState("General");
  const [isRefreshing, setIsRefresing] = useState(false);
  const navigation = useNavigation();

  const onSearch=()=>{
    console.log(selected)
    if(selected !=0){
    const newfilter = feed.filter(x => x.category === selected)
    console.log(newfilter)
    setfilterdata(newfilter)
    }else{
      setfilterdata(feed)
    }
  }
  const onDelete=(id)=>{
    console.log(id);
    console.log("Hello");
    axios.delete(`http://${SERVER_IP}:${SERVER_PORT}/api/home/Delete?postId=${id}`)
    onRefresh();
  }
  // const refreshData=()=>{
  //   fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main?postId=${lastpostId-10}`)
  //   .then((re)=>re.json())
  //   .then((re)=>{
  //     //console.log(re)
  //     setFeed(re)
  //     onSearch()
  //   })
  // }

  function onRefresh() {
    fetchData();
  }
  
  function fetchData() {
      fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main`)
      .then((re)=>re.json())
      .then((re)=>{
        //console.log(re)
        setFeed(re)
        setfilterdata(re)
      })
  }

  useEffect(()=>{
    fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/home/main`)
    .then((re)=>re.json())
    .then((re)=>{
      //console.log(re)
      setFeed(re)
      setfilterdata(re)
    })
  },[],)

  const renderLoader = () =>{
    return (
    <View style = {styles.footerLoader}>
      <ActivityIndicator size ="large">

      </ActivityIndicator>
    </View>
    )
  }


  return (

    <View style ={styles.mainView}>
    

      <View style={styles.TextInputView} >
      <TextInput
        value={searchInput}
        onChangeText={(val)=>setSearchInput(val)}
        paddingLeft={width}
        onTouchStart ={() =>navigation.navigate("PostCreation")} 
        
        placeholder={"Create post"}>
        </TextInput>
        </View>
        <SelectList 
                     setSelected={(val) => {setSelected(val) }} 
                     data={Categories} 
                     placeholder={"Filter by category"}
                     onSelect={()=>onSearch()}
        />



        <View style={styles.mainPostView}>
        {feed.length < 1 ?
        <ActivityIndicator size = {75} marginTop={height/4} color={"black"}/>
        :
        <FlatList
        contentContainerStyle={{ paddingBottom: 5 }}
        data={filterdata}
        keyExtractor={item=>{item.postId}}
        // onEndReachedThreshold={1}
        // onEndReached={refreshData} 
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={({item})=>(
        
        <View style={styles.feedBox} paddingLeft={10} paddingRight={10} >
            <View style={styles.postTitle}>

            <View ><Text onPress={() => navigation.navigate("Profile", item.userName)} style={styles.postUsername}>{"Posted by: "+item.userName+" on "+item.creationTime}</Text></View>

              <Text style={styles.postTitle} >
              {item.title}
              </Text>

            </View >
            
            <View style={styles.BottomIcons}>
            <IconButton
                icon={"message-outline"}
                size={20}
                onPress = {() => navigation.navigate('PostandComments', {
                  postId: item.postId,
                  title:item.title,
                  body:item.body
                })}
            />
            <IconButton 
                icon={"heart-outline"}
                size={20}
            />
            {item.userName == auth.userName ? 
            <IconButton 
            icon={"wrench"}
            size={20}
            onPress = {() => navigation.navigate('PostCreation', {
              postId: item.postId
            })}
            />
            :
            ""}

            {item.userName == auth.userName ? 
            <IconButton 
            icon={"window-close"}
            size={20}
            onPress = {() => onDelete(item.postId)}
            />
            :
            ""}
            </View>

        </View>
          
        )
        }
         />
        }



      
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView:{
    flex:1,
    allignItems:'center',
    backgroundColor:"#FFFFFF"
  },
  Heading:{
    fontSize:32,
    marginTop:10,
    fontWeight:'bold',
    justifyContent: 'center',
    allignItems:'center',
  },
  TextInput:{
    height:39,
    width:'90',
    backgroundColor:'#EBEBEB',
    borderWidth:100
  },
  TextInputView:{
    display:'flex',
    allignItems:'center'
  },
  mainPostView:{
    width:'100%',
    display:'flex',
    flex:1,
    allignItems:'center'
  },
  feedBox:{
    width:'100%',
    allignItems:'center',
    flex:1,
    backgroundColor:'#EEEEEE',
    borderBottomWidth:2,

    allignItems:'center',
    borderRadius:10
    
  },
  postTitle:{
    fontSize:20,
    flex:1,
  }, 
  TitleView:{
    fontSize:25,
  },
  postUsername:{
    fontSize:10,
    width:'100%',
    display:'flex',
    justifyContent:'space-evenly',
    flexDirection:'row',
    textAlign: 'left',
    
  },
  BottomIcons:{
    flexDirection:'row',

  },
    textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  footerLoader:{
    marginVertical:16,
    alignItems:'center'
  }
})


export default HomeScreen ;



//rnfe 