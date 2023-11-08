import React, { Children } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable,
  Dimensions
} from 'react-native';
import Tile from '../HabitTracker/components/tile';

function PageContainer({children}: any): JSX.Element {
  return (
    <View style={styles.pageContainer}>
      {children}
    </View>
  );
}
const windowHeight = Dimensions.get('window').height;
const PRIMARY_COLOR = '#8B5CF6';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const DAYS_COLOR_MAP = {
    'Monday': 'red',
    'Tuesday': 'green',
    'Wednesday': 'blue',
    'Thursday': 'yellow',
    'Friday': 'pink',
    'Saturday': 'purple',
    'Sunday': 'brown'
  }

  const backgroundStyle = {
    backgroundColor: '#000',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <PageContainer
          style={styles.pageContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.textStyle}>
                HABIT TRACKER
              </Text>
              <Pressable style={styles.newButton} onPress={() => Alert.alert('Simple Button pressed')}>
                <Text style={styles.textStyle}>New</Text>
              </Pressable>
            </View>

            <View style={styles.calendarContainer}>
              {DAYS.map((day, index) => {
                return(
                  <View style={styles.calendarColumnContainer}>
                    <Text>{day}</Text>
                    <Tile color={DAYS_COLOR_MAP[day]} handlePress={() => Alert.alert(`Today is ${day}`)} key={index}/>
                  </View>
                )
              }
              )}
            </View>
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 64,
    height: windowHeight
  },
  textStyle: {
    color: '#fff'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newButton: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 3,
    justifyContent: 'space-between',
    marginTop: 24
  },
  calendarColumnContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default App;
