package org.web;

import com.fastcgi.FCGIInterface;

import java.util.Properties;


public class Main {
    private static String resTable = """
            {
                "time": "%s",
                "result": %b
            }
            """;

    private static final String httpResponse = """
            Content-Type: application/json
                    
            {"code":"%d","result":"%s","x":"%d","y":"%.3f","r":"%.1f","time":"%s","result":"%.3f"}
            """;

    public static void main(String[] args) {


        FCGIInterface fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {

                long time = System.nanoTime();
                Properties prop = System.getProperties();
                String QUERY_STRING = prop.getProperty("QUERY_STRING");
                if (!QUERY_STRING.isBlank()) {

                    String[] responseData = QUERY_STRING.split("&");
                    float x = Float.parseFloat(responseData[0].substring(2));
                    int y = Integer.parseInt(responseData[1].substring(2));
                    int r = Integer.parseInt(responseData[2].substring(2));


                    //String getParams = System.getProperties().getProperty("QUERY_STRING");


                    //System.out.println(FCGIInterface.request.params.getProperty("REQUEST_METHOD"));

                    long startTime = System.currentTimeMillis();

                    var checking = checkDot(x, y, r);
                    long prossTime = System.currentTimeMillis() - startTime;


                    var json = String.format(resTable, prossTime, checking);
                    var response = String.format(httpResponse, json.getBytes().length + 2, json);

                    System.out.println(response);
                }

        }
    }

    private static boolean checkDot(float x, int y, int r) {
        if (x > 0) {
            if (y <= 0) {
                return x <= r & y >= -r / 2;
            } else {
                return x * x + y * y <= r * r;
            }
        } else {
            if (y <= 0) {
                return x - ((float) r / 2) <= y;
            }
            return false;
        }
    }

    //отсылка ответа на страницу
    //адо еще сделать так что бы при обновлении данные не пропадали

}