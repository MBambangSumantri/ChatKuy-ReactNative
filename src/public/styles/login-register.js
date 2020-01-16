import {StyleSheet} from 'react-native';
import color from '../../config/Config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//Set flex 1, jc: 'around' or 'space-between' for perfect margin or centering to container
const s = StyleSheet.create({
  flexCenter: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  container: {
    width: wp('100%'),
    flex: 1,
  },
  centerRotate: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  banner: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wp('80%'),
    height: hp('36%'),
  },
  primaryColor: {
    color: color.primary,
  },
  secondaryColor: {
    color: color.secondary,
  },
  tertiaryColor: {
    color: color.tertiary,
  },
  primaryBgColor: {
    backgroundColor: color.primary,
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerHi: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerPlease: {
    fontSize: 15,
    marginBottom: 10,
  },
  register: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 150,
    height: 24,
  },
  section: {
    marginVertical: 5,
  },
  sectionButton: {
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  input: {
    borderColor: '#000',
    borderBottomWidth: 0.5,
    paddingVertical: 4,
    fontSize: 18,
  },
  px4: {
    paddingHorizontal: 36,
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  jcCenter: {
    justifyContent: 'center',
    marginTop: 130,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wAuto: {
    width: 'auto',
  },
  buttonSignIn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary,
    marginBottom: 150,
    width: 176,
    height: 43,
    borderRadius: 5,
  },
  buttonSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary,
    marginBottom: 80,
    width: 176,
    height: 43,
    borderRadius: 5,
  },
  textButtonSignIn: {
    fontSize: 25,
  },
  textButtonSignUp: {
    fontSize: 25,
  },
  topRadius: {
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
  },
  lightColor: {
    color: color.light,
  },
  lightBgColor: {
    backgroundColor: color.light,
  },
  lightBorder: {
    borderColor: color.light,
  },
  p4: {
    padding: 36,
  },
  pt4: {
    paddingTop: 36,
  },
  pb8: {
    paddingBottom: 55,
  },
  py4: {
    paddingVertical: 36,
  },
  my4: {
    marginVertical: 36,
  },
  _mt4: {
    marginTop: -36,
  },
});

export default s;
