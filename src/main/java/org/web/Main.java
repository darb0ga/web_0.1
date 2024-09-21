package org.web;

import com.fastcgi.FCGIInterface;


public class Main {
    public static void main(String[] args) {
        var httpResponse = """
                HTTP/1.1 200 OK
                Content-Type: text/html
                Content-Length: %d
                %s
                """;


        var fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            var getParams = System.getProperties().getProperty("QUERY_STRING");
            //var params = ???
            long startTime = System.currentTimeMillis();
            //change
            int x = 1;
            int y = 1;
            int r = 1;

            var checking = checkDot(x, y, r);
            long prossTime = System.currentTimeMillis() - startTime;




            System.out.println(httpResponse);
        }
    }

    private static boolean checkDot(int x, int y, int r) {
        if (x > 0) {
            if (y <= 0) {
                return x <= r & y >= -r / 2;
            } else {
                return x * x + y * y <= r * r;
            }
        } else {
            if (y <= 0) {
                return x - (r / 2) <= y;
            }
            return false;
        }
    }

        //отсылка ответа на страницу
        //адо еще сделать так что бы при обновлении данные не пропадали

        //и кнопки побольше
        //ширину столбцов изменитьь



    //public static void main(String[] args) {
    //        var fcgi = new FCGIInterface();
    //        while (fcgi.FCGIaccept() >= 0) {
    //            try {
    //                var queryParams = System.getProperties().getProperty("QUERY_STRING");
    //                var params = new Params(queryParams);
    //
    //                var startTime = Instant.now();
    //                var result = calculate(params.getX(), params.getY(), params.getR());
    //                var endTime = Instant.now();
    //
    //                var json = String.format(RESULT_JSON, ChronoUnit.NANOS.between(startTime, endTime), LocalDateTime.now(), result);
    //                var response = String.format(HTTP_RESPONSE, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
    //                System.out.println(response);
    //            } catch (ValidationException e) {
    //                var json = String.format(ERROR_JSON, LocalDateTime.now(), e.getMessage());
    //                var response = String.format(HTTP_ERROR, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
    //                System.out.println(response);
    //            }
    //        }
    //    }

}