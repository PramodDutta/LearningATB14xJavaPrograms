package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;
import java.util.regex.*;

/**
 * Q11: URL Parser
 * ===============
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Parse URL and extract components.
 * Real Use: API testing, request validation.
 */
public class Q11_URLParser {

    public static void main(String[] args) {
        String url = "https://api.example.com:8080/users/123?name=john&active=true#section1";

        System.out.println("URL: " + url);
        System.out.println();

        URLComponents components = parseURL(url);
        System.out.println("Protocol: " + components.protocol);
        System.out.println("Host: " + components.host);
        System.out.println("Port: " + components.port);
        System.out.println("Path: " + components.path);
        System.out.println("Query: " + components.queryParams);
        System.out.println("Fragment: " + components.fragment);

        System.out.println("\n=== Build URL ===");
        String builtUrl = buildURL("https", "api.test.com", "/v1/users",
                Map.of("page", "1", "limit", "10"));
        System.out.println(builtUrl);
    }

    static class URLComponents {
        String protocol;
        String host;
        int port = -1;
        String path;
        Map<String, String> queryParams = new LinkedHashMap<>();
        String fragment;
    }

    // ============================================
    // Parse URL into Components
    // ============================================
    public static URLComponents parseURL(String url) {
        URLComponents components = new URLComponents();

        // Extract fragment
        int fragmentIndex = url.indexOf('#');
        if (fragmentIndex != -1) {
            components.fragment = url.substring(fragmentIndex + 1);
            url = url.substring(0, fragmentIndex);
        }

        // Extract query string
        int queryIndex = url.indexOf('?');
        if (queryIndex != -1) {
            String queryString = url.substring(queryIndex + 1);
            components.queryParams = parseQueryString(queryString);
            url = url.substring(0, queryIndex);
        }

        // Extract protocol
        Pattern protocolPattern = Pattern.compile("^(https?)://");
        Matcher matcher = protocolPattern.matcher(url);
        if (matcher.find()) {
            components.protocol = matcher.group(1);
            url = url.substring(matcher.end());
        }

        // Extract host and port
        int pathIndex = url.indexOf('/');
        String hostPort = pathIndex != -1 ? url.substring(0, pathIndex) : url;

        if (hostPort.contains(":")) {
            String[] parts = hostPort.split(":");
            components.host = parts[0];
            components.port = Integer.parseInt(parts[1]);
        } else {
            components.host = hostPort;
        }

        // Extract path
        if (pathIndex != -1) {
            components.path = url.substring(pathIndex);
        }

        return components;
    }

    // Parse query string to map
    public static Map<String, String> parseQueryString(String queryString) {
        Map<String, String> params = new LinkedHashMap<>();

        for (String param : queryString.split("&")) {
            String[] keyValue = param.split("=", 2);
            if (keyValue.length == 2) {
                params.put(keyValue[0], keyValue[1]);
            } else if (keyValue.length == 1) {
                params.put(keyValue[0], "");
            }
        }

        return params;
    }

    // Build URL from components
    public static String buildURL(String protocol, String host, String path, Map<String, String> params) {
        StringBuilder url = new StringBuilder();
        url.append(protocol).append("://").append(host).append(path);

        if (params != null && !params.isEmpty()) {
            url.append("?");
            StringJoiner joiner = new StringJoiner("&");
            params.forEach((k, v) -> joiner.add(k + "=" + v));
            url.append(joiner);
        }

        return url.toString();
    }
}

