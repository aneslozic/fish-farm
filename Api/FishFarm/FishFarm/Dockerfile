FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ./FishFarm.csproj ./
RUN dotnet restore "FishFarm.csproj"
COPY . .
RUN dotnet build "FishFarm.csproj" -c Release -o out

FROM build AS publish
RUN dotnet publish "FishFarm.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FishFarm.dll"]
